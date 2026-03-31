import { toast } from "react-toastify";
import { FaCreditCard, FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import Loader from "./Loader";
import {
  useGetSavedPaymentMethodsQuery,
  useDeletePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
} from "../redux/api/paymentApiSlice";

/**
 * SavedPaymentMethods
 *
 * Displays the user's saved Stripe cards with options to delete or set as
 * default.  Intended for use on the user profile / dashboard page.
 */
const SavedPaymentMethods = () => {
  const {
    data: methods = [],
    isLoading,
    refetch,
  } = useGetSavedPaymentMethodsQuery();

  const [deleteMethod, { isLoading: isDeleting }] =
    useDeletePaymentMethodMutation();
  const [setDefault, { isLoading: isSettingDefault }] =
    useSetDefaultPaymentMethodMutation();

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this payment method?")) return;
    try {
      await deleteMethod(id).unwrap();
      toast.success("Payment method removed");
      refetch();
    } catch (err) {
      toast.error(err?.data?.error || "Failed to remove payment method");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefault(id).unwrap();
      toast.success("Default payment method updated");
      refetch();
    } catch (err) {
      toast.error(err?.data?.error || "Failed to update default");
    }
  };

  if (isLoading) return <Loader />;

  if (methods.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        No saved payment methods. Complete a purchase and check &ldquo;Save
        card&rdquo; to add one.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <div
          key={method._id}
          className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-[#1a1a1a]"
        >
          <div className="flex items-center gap-3">
            <FaCreditCard className="text-pink-500 text-xl" />
            <div>
              <p className="font-medium capitalize">
                {method.brand} •••• {method.last4}
              </p>
              <p className="text-xs text-gray-400">
                Expires {method.expMonth}/{method.expYear}
              </p>
            </div>
            {method.isDefault && (
              <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full ml-2">
                Default
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSetDefault(method._id)}
              disabled={method.isDefault || isSettingDefault}
              title={method.isDefault ? "Already default" : "Set as default"}
              className="text-yellow-400 hover:text-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {method.isDefault ? <FaStar /> : <FaRegStar />}
            </button>
            <button
              onClick={() => handleDelete(method._id)}
              disabled={isDeleting}
              title="Remove"
              className="text-red-400 hover:text-red-300 disabled:opacity-40"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedPaymentMethods;
