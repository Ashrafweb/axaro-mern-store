import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div>
        <Link
          to='/'
          className='text-orange-600 font-semibold hover:underline ml-10'
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className='flex flex-wrap relative items-start mt-8 ml-10'>
            <div className='w-full lg:w-1/2'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full xl:w-3/4 lg:w-4/5 md:w-3/4 sm:w-2/3 mr-8'
              />
              <HeartIcon product={product} />
            </div>

            <div className='w-full lg:w-1/2 flex flex-col justify-between'>
              <h2 className='text-2xl font-semibold'>{product.name}</h2>
              <p className='my-4 text-gray-500 xl:w-3/4 lg:w-3/4 md:w-3/4'>
                {product.description}
              </p>

              <p className='text-5xl my-4 font-extrabold text-orange-600'>
                $ {product.price}
              </p>

              <div className='flex items-center justify-between w-full'>
                <div className='one w-1/2'>
                  <h1 className='flex items-center mb-6'>
                    <FaStore className='mr-2 text-orange-600' /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className='flex items-center mb-6'>
                    <FaClock className='mr-2 text-orange-600' /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className='flex items-center mb-6'>
                    <FaStar className='mr-2 text-orange-600' /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className='two w-1/2'>
                  <h1 className='flex items-center mb-6'>
                    <FaStar className='mr-2 text-orange-600' /> Ratings:{" "}
                    {rating}
                  </h1>
                  <h1 className='flex items-center mb-6'>
                    <FaShoppingCart className='mr-2 text-orange-600' />{" "}
                    Quantity: {product.quantity}
                  </h1>
                  <h1 className='flex items-center mb-6'>
                    <FaBox className='mr-2 text-orange-600' /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className='flex justify-between flex-wrap mb-4'>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className='p-2 w-24 rounded-lg text-black'
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className='btn-container'>
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className='bg-orange-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0'
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className='mt-20 w-full'>
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
