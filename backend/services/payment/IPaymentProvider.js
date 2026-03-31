/**
 * IPaymentProvider – Payment Strategy Interface
 *
 * Every payment provider adapter must implement these methods so that
 * PaymentService can call them through a uniform interface (Strategy pattern).
 */
class IPaymentProvider {
  /**
   * Create a payment intent / session for the given amount.
   * @param {object} params
   * @param {number}  params.amount       Amount in the major currency unit (e.g. dollars for USD)
   * @param {string}  params.currency     ISO currency code (e.g. "usd")
   * @param {object}  [params.metadata]   Arbitrary key-value pairs
   * @returns {Promise<object>}  Provider-specific intent/session object
   */
  async createPaymentIntent({ amount, currency, metadata }) {
    throw new Error("createPaymentIntent() must be implemented by the adapter");
  }

  /**
   * Confirm / capture a payment intent.
   * @param {string} intentId   Provider payment intent identifier
   * @returns {Promise<object>} Updated intent object
   */
  async confirmPaymentIntent(intentId) {
    throw new Error(
      "confirmPaymentIntent() must be implemented by the adapter"
    );
  }

  /**
   * Create or retrieve a provider-specific customer for the user.
   * @param {object} params
   * @param {string} params.email     Customer email
   * @param {string} [params.name]    Customer display name
   * @returns {Promise<object>} Provider customer object
   */
  async createCustomer({ email, name }) {
    throw new Error("createCustomer() must be implemented by the adapter");
  }

  /**
   * Attach a payment method to a customer.
   * @param {string} customerId        Provider customer id
   * @param {string} paymentMethodId   Provider payment-method id
   * @returns {Promise<object>}
   */
  async attachPaymentMethod(customerId, paymentMethodId) {
    throw new Error(
      "attachPaymentMethod() must be implemented by the adapter"
    );
  }

  /**
   * Retrieve a specific payment method.
   * @param {string} paymentMethodId
   * @returns {Promise<object>}
   */
  async getPaymentMethod(paymentMethodId) {
    throw new Error("getPaymentMethod() must be implemented by the adapter");
  }

  /**
   * Refund a payment.
   * @param {string} transactionId   Provider transaction / charge identifier
   * @param {number} [amount]        Partial refund amount; omit for full refund
   * @returns {Promise<object>}
   */
  async refund(transactionId, amount) {
    throw new Error("refund() must be implemented by the adapter");
  }
}

export default IPaymentProvider;
