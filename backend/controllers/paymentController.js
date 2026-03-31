import Order from "../models/orderModel.js";
import Transaction from "../models/transactionModel.js";
import PaymentMethodModel from "../models/paymentMethodModel.js";
import PaymentService from "../services/payment/PaymentService.js";
import mongoose from "mongoose";
import {
  enqueueOrderConfirmationEmail,
  getOrderQueue,
} from "../services/queue/queues.js";

// ─── Stripe ──────────────────────────────────────────────────────────────────

/**
 * POST /api/payments/stripe/intent
 * Create a Stripe PaymentIntent for the given order.
 */
const createStripePaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const order = await Order.findById(orderId).populate("user", "email username");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.isPaid) {
      return res.status(400).json({ error: "Order is already paid" });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const stripe = PaymentService.getInstance().getProvider("stripe");

    const intent = await stripe.createPaymentIntent({
      amount: order.totalPrice,
      currency: "usd",
      metadata: {
        orderId: order._id.toString(),
        userId: req.user._id.toString(),
      },
    });

    res.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/payments/stripe/confirm
 * Called by the frontend after Stripe confirms the payment on the client side.
 * Updates the order, creates a Transaction record, and enqueues a confirmation email.
 */
const confirmStripePayment = async (req, res) => {
  try {
    const { orderId, paymentIntentId, paymentMethodId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const order = await Order.findById(orderId).populate(
      "user",
      "email username"
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (order.isPaid) {
      return res.status(400).json({ error: "Order is already paid" });
    }

    // Verify the payment intent with Stripe
    const stripe = PaymentService.getInstance().getProvider("stripe");
    const intent = await stripe.confirmPaymentIntent(paymentIntentId);

    if (intent.status !== "succeeded") {
      return res
        .status(400)
        .json({ error: `Payment not successful: ${intent.status}` });
    }

    // Update the order
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: intent.id,
      status: intent.status,
      update_time: new Date().toISOString(),
      email_address: order.user.email,
    };
    const updatedOrder = await order.save();

    // Record the transaction
    await Transaction.create({
      order: order._id,
      user: req.user._id,
      provider: "stripe",
      providerTransactionId: intent.id,
      amount: order.totalPrice,
      currency: intent.currency || "usd",
      status: "succeeded",
      metadata: { paymentIntentId: intent.id, paymentMethodId },
    });

    // Save payment method if provided
    if (paymentMethodId) {
      try {
        await _saveStripePaymentMethod(req.user, paymentMethodId, stripe);
      } catch {
        // Non-critical – don't fail the payment confirmation
      }
    }

    // Enqueue confirmation email
    await enqueueOrderConfirmationEmail(updatedOrder.toObject({ virtuals: true }));

    // Enqueue post-payment order processing
    try {
      const oq = getOrderQueue();
      if (oq) {
        await oq.add("post-payment", { orderId: order._id.toString() });
      }
    } catch {
      // Non-critical
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/payments/stripe/webhook
 * Stripe webhook endpoint.  Processes Stripe events and updates orders.
 * Requires raw body (set up in index.js before express.json()).
 */
const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    const stripe = PaymentService.getInstance().getProvider("stripe");
    event = stripe.constructWebhookEvent(req.body, sig);
  } catch (err) {
    console.error("[Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: "Webhook signature verification failed" });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;
      const orderId = intent.metadata?.orderId;
      if (orderId) {
        const order = await Order.findById(orderId).populate(
          "user",
          "email username"
        );
        if (order && !order.isPaid) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: intent.id,
            status: intent.status,
            update_time: new Date().toISOString(),
            email_address: order.user?.email || "",
          };
          await order.save();

          await Transaction.findOneAndUpdate(
            { providerTransactionId: intent.id },
            { status: "succeeded" },
            { upsert: false }
          );

          await enqueueOrderConfirmationEmail(
            order.toObject({ virtuals: true })
          );
        }
      }
    }

    if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object;
      await Transaction.findOneAndUpdate(
        { providerTransactionId: intent.id },
        { status: "failed" },
        { upsert: false }
      );
    }

    res.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Handler error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ─── Saved Payment Methods ────────────────────────────────────────────────────

/**
 * GET /api/payments/methods
 * List the authenticated user's saved payment methods.
 */
const getSavedPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethodModel.find({
      user: req.user._id,
    }).sort({ isDefault: -1, createdAt: -1 });

    res.json(methods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/payments/methods
 * Save a Stripe payment method for the authenticated user.
 * Body: { paymentMethodId }
 */
const savePaymentMethod = async (req, res) => {
  try {
    const { paymentMethodId } = req.body;
    if (!paymentMethodId) {
      return res.status(400).json({ error: "paymentMethodId is required" });
    }

    const stripe = PaymentService.getInstance().getProvider("stripe");
    const saved = await _saveStripePaymentMethod(req.user, paymentMethodId, stripe);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE /api/payments/methods/:id
 * Remove a saved payment method.
 */
const deletePaymentMethod = async (req, res) => {
  try {
    const method = await PaymentMethodModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!method) {
      return res.status(404).json({ error: "Payment method not found" });
    }

    res.json({ message: "Payment method removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * PUT /api/payments/methods/:id/default
 * Set a payment method as the user's default.
 */
const setDefaultPaymentMethod = async (req, res) => {
  try {
    const method = await PaymentMethodModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!method) {
      return res.status(404).json({ error: "Payment method not found" });
    }

    // Unset other defaults
    await PaymentMethodModel.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );

    method.isDefault = true;
    await method.save();

    res.json(method);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── Stripe public key ────────────────────────────────────────────────────────

/**
 * GET /api/config/stripe
 * Return the Stripe publishable key (safe to expose to the browser).
 */
const getStripePublishableKey = async (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "" });
};

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Upsert a Stripe payment method for the given user in MongoDB.
 * @param {object} user             Mongoose User document or populated sub-doc
 * @param {string} paymentMethodId  Stripe payment method id
 * @param {StripeProvider} stripe   StripeProvider instance
 * @returns {Promise<object>}       Saved PaymentMethod document
 */
async function _saveStripePaymentMethod(user, paymentMethodId, stripe) {
  // Validate Stripe payment method ID format (e.g. pm_1AbCdEf...)
  if (
    typeof paymentMethodId !== "string" ||
    !/^pm_[A-Za-z0-9]+$/.test(paymentMethodId)
  ) {
    throw new Error("Invalid payment method ID format");
  }

  // Avoid duplicates
  const existing = await PaymentMethodModel.findOne({
    user: user._id,
    stripePaymentMethodId: paymentMethodId,
  });
  if (existing) return existing;

  // Fetch card details from Stripe
  const pm = await stripe.getPaymentMethod(paymentMethodId);

  return PaymentMethodModel.create({
    user: user._id,
    provider: "stripe",
    stripePaymentMethodId: paymentMethodId,
    brand: pm.card?.brand,
    last4: pm.card?.last4,
    expMonth: pm.card?.exp_month,
    expYear: pm.card?.exp_year,
  });
}

export {
  createStripePaymentIntent,
  confirmStripePayment,
  stripeWebhook,
  getSavedPaymentMethods,
  savePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  getStripePublishableKey,
};
