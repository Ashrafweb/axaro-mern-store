/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className='flex flex-col justify-center items-center text-center gap-1'>
      <div className='relative'>
        <img
          src={product.image}
          alt={product.name}
          className='w-[15rem] sm:w[20rem] md:w-[30rem] rounded'
        />
        <HeartIcon product={product} />
      </div>

      <div className='p-4'>
        <Link to={`/product/${product._id}`}>
          <div className='mb-3'>
            <h2>{product.name}</h2>
          </div>
        </Link>
        <span className='bg-orange-100 text-orange-800 text-sm font-medium mr-2 px-2.5 py-0.5  rounded-full dark:bg-orange-900 dark:text-orange-300'>
          $ {product.price}
        </span>
      </div>
    </div>
  );
};

export default Product;
