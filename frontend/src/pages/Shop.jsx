import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { FaFilter } from "react-icons/fa";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...new Set(
      filteredProductsQuery.data
        ?.map((product) => product.brand)
        .filter((brand) => brand !== undefined)
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col md:flex-row md:items-start md:space-x-8'>
        {/* Filter Button (Mobile) */}
        <button
          className='md:hidden mb-4 p-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400'
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className='flex items-center gap-2'>
            <FaFilter /> Filter
          </span>
        </button>

        {/* Filter Section */}
        <aside
          className={`w-full md:w-1/4 bg-orange-600 text-white p-4 rounded-md transition-all duration-300
                         ${isFilterOpen ? "block" : "hidden"} md:block`}
        >
          <h2 className='text-lg font-semibold mb-4 text-center'>
            Filter Options
          </h2>

          <div className='mb-4'>
            <h3 className='font-semibold mb-2'>Categories</h3>
            {categories?.map((c) => (
              <div key={c._id} className='mb-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className='form-checkbox h-4 w-4 mr-2 text-orange-400 focus:ring-2 focus:ring-orange-300'
                  />
                  <span>{c.name}</span>
                </label>
              </div>
            ))}
          </div>

          <div className='mb-4'>
            <h3 className='font-semibold mb-2'>Brands</h3>
            {uniqueBrands?.map((brand) => (
              <div key={brand} className='mb-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='brand'
                    onChange={() => handleBrandClick(brand)}
                    className='form-radio h-4 w-4 mr-2 text-orange-400 focus:ring-2 focus:ring-orange-300'
                  />
                  <span>{brand}</span>
                </label>
              </div>
            ))}
          </div>

          <div>
            <h3 className='font-semibold mb-2'>Price</h3>
            <input
              type='text'
              placeholder='Enter Price'
              value={priceFilter}
              onChange={handlePriceChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-300 bg-orange-700 text-white'
            />
          </div>

          <button
            className='w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300'
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </aside>

        {/* Product Grid */}
        <div className='w-full md:w-3/4'>
          <h2 className='text-2xl font-semibold mb-4'>
            {products?.length} Products
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.length === 0 ? (
              <div className='col-span-full text-center'>
                <Loader />
              </div>
            ) : (
              products?.map((p) => (
                <div key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
