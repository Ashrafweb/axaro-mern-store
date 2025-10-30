import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/placeorder");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProgressSteps step1 step2 />
      <div className="mt-8 md:mt-16 flex justify-center items-start">
        <form onSubmit={submitHandler} className="w-full max-w-2xl space-y-5">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Shipping</h1>
          <div>
            <label className="label-text">Address</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="label-text">City</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="label-text">Postal Code</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div>
            <label className="label-text">Country</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <label className="label-text">Select Payment Method</label>
            <div className="mt-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio text-secondary h-5 w-5"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-3 font-medium">PayPal or Credit Card</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-secondary w-full flex items-center justify-center gap-2 text-lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
