import express from "express";
import rateLimitMiddleware from "../middlewares/rateLimiter.js";
import {
  createStripePaymentIntent,
  confirmStripePayment,
  stripeWebhook,
  getSavedPaymentMethods,
  savePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
} from "../controllers/paymentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ── Stripe webhook (must come before express.json() parses the body)
// The raw body is needed for Stripe signature verification.
// We register this route with express.raw middleware inline.
router.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ── Stripe payment flow
router.post("/stripe/intent", rateLimitMiddleware, authenticate, createStripePaymentIntent);
router.post("/stripe/confirm", rateLimitMiddleware, authenticate, confirmStripePayment);

// ── Saved payment methods
router
  .route("/methods")
  .get(rateLimitMiddleware, authenticate, getSavedPaymentMethods)
  .post(rateLimitMiddleware, authenticate, savePaymentMethod);

router.route("/methods/:id").delete(rateLimitMiddleware, authenticate, deletePaymentMethod);
router.route("/methods/:id/default").put(rateLimitMiddleware, authenticate, setDefaultPaymentMethod);

export default router;
