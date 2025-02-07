import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Product from "./Products/Product";
import Footer from "../components/Footer";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    let errorMessage = "An error occurred.";
    if (error.originalStatus === 429) {
      errorMessage = "Too many requests, please try again in 15 minutes.";
    } else if (error?.data?.message) {
      // Check if a message is available
      errorMessage = error.data.message;
    } else if (typeof error.data === "string") {
      errorMessage = error.data;
    }

    return (
      <div className='text-2xl font-serif mx-auto p-4 text-center text-red-500'>
        {" "}
        {/* Centered and styled error message */}
        {errorMessage}
      </div>
    );
  }

  return (
    <div className=' min-h-screen'>
      {" "}
      {!keyword ? <Header /> : null}
      <div className='container mx-auto p-4'>
        {" "}
        <div className='flex justify-center items-center mb-4 text-center'>
          <h1 className='text-center text-md font-bold md:text-3xl lg:text-4xl py-2 md:py-8'>
            {" "}
            Special Products
          </h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {" "}
          {data?.products?.map((product) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
