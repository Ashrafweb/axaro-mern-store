import { apiSlice } from "./apiSlice";
import { PAYMENTS_URL, STRIPE_CONFIG_URL } from "../constants";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch Stripe publishable key
    getStripeKey: builder.query({
      query: () => STRIPE_CONFIG_URL,
    }),

    // Create a Stripe PaymentIntent
    createStripeIntent: builder.mutation({
      query: ({ orderId }) => ({
        url: `${PAYMENTS_URL}/stripe/intent`,
        method: "POST",
        body: { orderId },
      }),
    }),

    // Confirm a Stripe payment after the client confirms it
    confirmStripePayment: builder.mutation({
      query: ({ orderId, paymentIntentId, paymentMethodId, saveCard }) => ({
        url: `${PAYMENTS_URL}/stripe/confirm`,
        method: "POST",
        body: { orderId, paymentIntentId, paymentMethodId, saveCard },
      }),
    }),

    // List saved payment methods
    getSavedPaymentMethods: builder.query({
      query: () => `${PAYMENTS_URL}/methods`,
      providesTags: ["PaymentMethod"],
    }),

    // Save a new payment method
    savePaymentMethod: builder.mutation({
      query: ({ paymentMethodId }) => ({
        url: `${PAYMENTS_URL}/methods`,
        method: "POST",
        body: { paymentMethodId },
      }),
      invalidatesTags: ["PaymentMethod"],
    }),

    // Delete a saved payment method
    deletePaymentMethod: builder.mutation({
      query: (id) => ({
        url: `${PAYMENTS_URL}/methods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),

    // Set default payment method
    setDefaultPaymentMethod: builder.mutation({
      query: (id) => ({
        url: `${PAYMENTS_URL}/methods/${id}/default`,
        method: "PUT",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
  }),
});

export const {
  useGetStripeKeyQuery,
  useCreateStripeIntentMutation,
  useConfirmStripePaymentMutation,
  useGetSavedPaymentMethodsQuery,
  useSavePaymentMethodMutation,
  useDeletePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
} = paymentApiSlice;
