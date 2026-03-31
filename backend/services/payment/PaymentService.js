import StripeProvider from "./StripeProvider.js";
import PayPalProvider from "./PayPalProvider.js";

/**
 * PaymentService – Dependency-Injection container and Context for the
 * Strategy pattern.
 *
 * Usage:
 *   const svc = PaymentService.getInstance();
 *   const stripeProvider = svc.getProvider("stripe");
 *   await stripeProvider.createPaymentIntent({ amount: 99.99, currency: "usd" });
 */
class PaymentService {
  constructor() {
    this._providers = new Map();
    this._registerDefaults();
  }

  _registerDefaults() {
    try {
      this.register("stripe", new StripeProvider());
    } catch {
      // Stripe not configured – skip silently; routes will return 503.
    }
    this.register("paypal", new PayPalProvider());
  }

  /**
   * Register a payment provider under the given key.
   * @param {string}           name     Provider key (e.g. "stripe", "paypal")
   * @param {IPaymentProvider} provider Provider instance
   */
  register(name, provider) {
    this._providers.set(name.toLowerCase(), provider);
  }

  /**
   * Retrieve a registered payment provider.
   * @param {string} name   Provider key
   * @returns {IPaymentProvider}
   */
  getProvider(name) {
    const provider = this._providers.get(name.toLowerCase());
    if (!provider) {
      throw new Error(`Payment provider "${name}" is not registered`);
    }
    return provider;
  }

  /** Singleton accessor */
  static getInstance() {
    if (!PaymentService._instance) {
      PaymentService._instance = new PaymentService();
    }
    return PaymentService._instance;
  }
}

PaymentService._instance = null;

export default PaymentService;
