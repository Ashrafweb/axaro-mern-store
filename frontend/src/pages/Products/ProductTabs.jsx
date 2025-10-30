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
                            ? "bg-primary text-white"
                            : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary/10 hover:text-primary"
                        }`}
              onClick={() => handleTabClick(1)}
            >
              Write Your Review
            </button>
            <button
              className={`py-2 px-4 rounded-t-lg md:rounded-none text-lg font-medium transition-colors duration-300 w-full md:w-auto
                        ${
                          activeTab === 2
                            ? "bg-primary text-white"
                            : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary/10 hover:text-primary"
                        }`}
              onClick={() => handleTabClick(2)}
            >
              All Reviews
            </button>
            <button
              className={`py-2 px-4 rounded-t-lg md:rounded-tr-lg md:rounded-none text-lg font-medium transition-colors duration-300 w-full md:w-auto
                        ${
                          activeTab === 3
                            ? "bg-primary text-white"
                            : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary/10 hover:text-primary"
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
                      className='label-text'
                    >
                      Rating
                    </label>
                    <select
                      id='rating'
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className='input-field'
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
                      className='label-text'
                    >
                      Comment
                    </label>
                    <textarea
                      id='comment'
                      rows='3'
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className='input-field'
                    ></textarea>
                  </div>
                  <button
                    type='submit'
                    disabled={loadingProductReview}
                    className='btn-primary flex items-center justify-center gap-2'
                  >
                    {loadingProductReview ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              ) : (
                <p className='text-light-text-secondary dark:text-dark-text-secondary font-medium'>
                  Please{" "}
                  <Link to='/login' className='text-primary hover:text-primary-dark hover:underline transition-colors'>
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
                <p className='text-light-text-secondary dark:text-dark-text-secondary font-medium'>No Reviews</p>
              )}
              {product.reviews.map((review) => (
                <div key={review._id} className='card'>
                  <div className='flex justify-between items-center mb-2'>
                    <strong className='text-light-text-primary dark:text-dark-text-primary font-semibold'>{review.name}</strong>
                    <p className='text-light-text-muted dark:text-dark-text-muted text-sm'>
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className='text-light-text-secondary dark:text-dark-text-secondary mb-2'>{review.comment}</p>
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
