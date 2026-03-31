import mongoose from "mongoose";

const paymentMethodSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    provider: {
      type: String,
      required: true,
      enum: ["stripe"],
    },
    stripeCustomerId: {
      type: String,
    },
    stripePaymentMethodId: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    last4: {
      type: String,
    },
    expMonth: {
      type: Number,
    },
    expYear: {
      type: Number,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
export default PaymentMethod;
