import Stripe from "stripe";
import IPaymentProvider from "./IPaymentProvider.js";

/**
 * StripeProvider – Adapter that wraps the Stripe SDK behind the
 * IPaymentProvider interface (Adapter + Strategy pattern).
 */
class StripeProvider extends IPaymentProvider {
  constructor() {
    super();
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    this._stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
  }

  async createPaymentIntent({ amount, currency = "usd", metadata = {} }) {
    return this._stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert dollars → cents
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });
  }

  async confirmPaymentIntent(intentId) {
    return this._stripe.paymentIntents.retrieve(intentId);
  }

  async createCustomer({ email, name }) {
    return this._stripe.customers.create({ email, name });
  }

  async attachPaymentMethod(customerId, paymentMethodId) {
    await this._stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    return this._stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
  }

  async getPaymentMethod(paymentMethodId) {
    return this._stripe.paymentMethods.retrieve(paymentMethodId);
  }

  async refund(transactionId, amount) {
    const params = { payment_intent: transactionId };
    if (amount) params.amount = Math.round(amount * 100);
    return this._stripe.refunds.create(params);
  }

  /** Verify a Stripe webhook signature and return the event */
  constructWebhookEvent(payload, signature) {
    return this._stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  }
}

export default StripeProvider;
