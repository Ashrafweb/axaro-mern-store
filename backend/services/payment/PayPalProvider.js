import IPaymentProvider from "./IPaymentProvider.js";

/**
 * PayPalProvider – Adapter that wraps the existing PayPal REST flow
 * behind the IPaymentProvider interface (Adapter + Strategy pattern).
 *
 * The current frontend already uses the @paypal/react-paypal-js SDK which
 * executes the full capture flow client-side and sends the result to
 * POST /api/orders/:id/pay.  This adapter therefore acts as a thin
 * record-keeping wrapper used by the payment controller when it needs to
 * interact with PayPal server-side.
 */
class PayPalProvider extends IPaymentProvider {
  constructor() {
    super();
    this._clientId = process.env.PAYPAL_CLIENT_ID || "";
    this._clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";
    this._baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";
  }

  /** Return the public client-id needed by the frontend SDK */
  getClientId() {
    return this._clientId;
  }

  /**
   * createPaymentIntent is not used for PayPal; the full order/capture cycle
   * happens client-side via the PayPal JS SDK.  This stub is provided so that
   * PayPalProvider satisfies the IPaymentProvider interface.
   */
  async createPaymentIntent({ amount, currency, metadata }) {
    throw new Error(
      "PayPal payment is processed client-side – use the PayPal JS SDK"
    );
  }

  async confirmPaymentIntent(intentId) {
    throw new Error(
      "PayPal payment confirmation happens client-side via the PayPal JS SDK"
    );
  }

  async createCustomer({ email, name }) {
    // PayPal does not expose a customer management API in the same way.
    return { email, name };
  }

  async attachPaymentMethod(customerId, paymentMethodId) {
    throw new Error("PayPal does not support saved payment methods via API");
  }

  async getPaymentMethod(paymentMethodId) {
    throw new Error("PayPal does not support fetching payment methods via API");
  }

  async refund(transactionId, amount) {
    throw new Error(
      "PayPal server-side refunds require PayPal REST API integration – not yet implemented"
    );
  }
}

export default PayPalProvider;
