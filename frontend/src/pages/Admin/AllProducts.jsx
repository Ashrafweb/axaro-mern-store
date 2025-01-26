import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className='container mx-[2rem] w-full'>
        <div className='ml-[1rem] text-xl font-bold h-12'>
          All Products ({products.length})
        </div>
        <div className='flex flex-wrap justify-start items-center w-full'>
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/admin/product/update/${product._id}`}
              className=''
            >
              <div className='flex justify-evenly w-full'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-[6rem] object-contain'
                />
                <div className='p-4 flex flex-col justify-around'>
                  <div className='flex justify-between'>
                    <h5 className='text-xl font-semibold mb-2'>
                      {product?.name}
                    </h5>
                  </div>

                  <p className='text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4'>
                    {product?.description?.substring(0, 160)}...
                  </p>
                  <p className='text-gray-400 text-xs pb-2'>
                    {moment(product.createdAt).format("MMMM Do YYYY")}
                  </p>

                  <div className='flex justify-start gap-6'>
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800'
                    >
                      Update Product
                      <svg
                        className='w-3.5 h-3.5 ml-2'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 10'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M1 5h12m0 0L9 1m4 4L9 9'
                        />
                      </svg>
                    </Link>
                    <div className='bg-blue-900 text-white w-max mb-2 rounded-md p-1 h-full'>
                      <p className='font-serif font-semibold'>
                        $ {product?.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
