import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import {
  useConfirmStripePaymentMutation,
} from "../redux/api/paymentApiSlice";

/**
 * StripePaymentForm
 *
 * Renders Stripe's <PaymentElement> and handles client-side payment
 * confirmation followed by a server-side confirmation call.
 *
 * Props:
 *   orderId        – MongoDB order _id
 *   onSuccess(order) – called after successful payment with the updated order
 */
const StripePaymentForm = ({ orderId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [confirmStripePayment] = useConfirmStripePaymentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // 1. Submit the Elements form (validates card fields)
      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast.error(submitError.message);
        setIsProcessing(false);
        return;
      }

      // 2. Confirm the payment with Stripe (client-side)
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 3. Notify the backend to update the order
        const result = await confirmStripePayment({
          orderId,
          paymentIntentId: paymentIntent.id,
          paymentMethodId: paymentIntent.payment_method,
          saveCard,
        }).unwrap();

        toast.success("Payment successful!");
        onSuccess(result);
      }
    } catch (err) {
      toast.error(err?.data?.error || err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      <div className="flex items-center gap-2 mt-2">
        <input
          id="save-card"
          type="checkbox"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
          className="h-4 w-4 accent-pink-500 cursor-pointer"
        />
        <label htmlFor="save-card" className="text-sm cursor-pointer">
          Save card for future purchases
        </label>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="bg-pink-500 text-white w-full py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            Processing…
          </span>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

export default StripePaymentForm;
