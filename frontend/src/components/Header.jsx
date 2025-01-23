import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className='text-center'>
        <ProductCarousel />
        <div className='text-center py-2 md:py-10'>
          <h1 className='text-md font-bold md:text-3xl lg:text-4xl py-2 md:py-8'>
            {" "}
            Trending Products
          </h1>
          <div className='flex flex-wrap justify-center'>
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
