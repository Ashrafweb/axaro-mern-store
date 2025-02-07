/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='md:w-1/4 w-full'>
          <div className='flex flex-col md:flex-row border-b border-gray-300'>
            <button
              className={`py-2 px-4 rounded-t-lg md:rounded-tl-lg md:rounded-none text-lg font-medium transition-colors duration-300 w-full md:w-auto
                        ${
                          activeTab === 1
                            ? "bg-orange-500 text-white"
                            : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
                        }`}
              onClick={() => handleTabClick(1)}
            >
              Write Your Review
            </button>
            <button
              className={`py-2 px-4 rounded-t-lg md:rounded-none text-lg font-medium transition-colors duration-300 w-full md:w-auto
                        ${
                          activeTab === 2
                            ? "bg-orange-500 text-white"
                            : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
                        }`}
              onClick={() => handleTabClick(2)}
            >
              All Reviews
            </button>
            <button
              className={`py-2 px-4 rounded-t-lg md:rounded-tr-lg md:rounded-none text-lg font-medium transition-colors duration-300 w-full md:w-auto
                        ${
                          activeTab === 3
                            ? "bg-orange-500 text-white"
                            : "text-gray-600 hover:bg-orange-100 hover:text-orange-500"
                        }`}
              onClick={() => handleTabClick(3)}
            >
              Related Products
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className='md:w-3/4 w-full'>
          {activeTab === 1 && (
            <div className='mt-4'>
              {userInfo ? (
                <form onSubmit={submitHandler} className='space-y-4'>
                  <div>
                    <label
                      htmlFor='rating'
                      className='block text-lg font-medium text-gray-700'
                    >
                      Rating
                    </label>
                    <select
                      id='rating'
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 sm:text-sm bg-white'
                    >
                      <option value=''>Select</option>
                      <option value='1'>Inferior</option>
                      <option value='2'>Decent</option>
                      <option value='3'>Great</option>
                      <option value='4'>Excellent</option>
                      <option value='5'>Exceptional</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor='comment'
                      className='block text-lg font-medium text-gray-700'
                    >
                      Comment
                    </label>
                    <textarea
                      id='comment'
                      rows='3'
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 sm:text-sm bg-white'
                    ></textarea>
                  </div>
                  <button
                    type='submit'
                    disabled={loadingProductReview}
                    className='bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200'
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <p className='text-gray-700'>
                  Please{" "}
                  <Link to='/login' className='text-orange-500 hover:underline'>
                    sign in
                  </Link>{" "}
                  to write a review
                </p>
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div className='mt-4 space-y-4'>
              {product.reviews.length === 0 && (
                <p className='text-gray-700'>No Reviews</p>
              )}
              {product.reviews.map((review) => (
                <div key={review._id} className='bg-gray-100 p-4 rounded-lg'>
                  <div className='flex justify-between items-center mb-2'>
                    <strong className='text-gray-700'>{review.name}</strong>
                    <p className='text-gray-500 text-sm'>
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className='text-gray-700'>{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 3 && (
            <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {!data ? (
                <Loader />
              ) : (
                data.map((product) => (
                  <div key={product._id}>
                    <SmallProduct product={product} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
