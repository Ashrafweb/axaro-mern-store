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
    if (error.originalStatus === 429) {
      return (
        <div className='text-2xl font-serif ml-4 sm:ml-14 p-4 '>
          Too many requests, please try again in 15 minutes
        </div>
      );
    } else {
      return (
        <div className='text-2xl font-serif mx-auto p-4 '>{error.data}</div>
      );
    }
  }
  return (
    <>
      {!keyword ? <Header /> : null}
      <>
        <div className='flex justify-between items-center'>
          <h1 className=''>Special Products</h1>
        </div>

        <div>
          <div className='flex justify-center flex-wrap mt-[2rem]'>
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </>
      <Footer />
    </>
  );
};

export default Home;
