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
import { FaFilter, FaTimes } from "react-icons/fa";

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
		<div className='min-h-screen bg-light-bg dark:bg-dark-bg'>
			<div className='container mx-auto px-4 py-8'>
				{/* Header */}
				<div className='flex items-center justify-between mb-8'>
					<h1 className='text-3xl font-bold text-light-text-primary dark:text-dark-text-primary'>
						Shop
					</h1>
					<button
						className='md:hidden flex items-center gap-2 px-4 py-2 bg-primary text-dark-text-primary rounded-lg shadow-sm hover:shadow-md transition-shadow'
						onClick={() => setIsFilterOpen(!isFilterOpen)}
					>
						{isFilterOpen ? <FaTimes /> : <FaFilter />}
						{isFilterOpen ? "Close" : "Filters"}
					</button>
				</div>

				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Filter Sidebar */}
					<div
						className={`${
							isFilterOpen ? "block" : "hidden"
						} lg:block w-full lg:w-80 bg-light-card dark:bg-dark-card rounded-xl shadow-sm p-6 border border-light-border dark:border-dark-border`}
					>
						<h2 className='text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary'>
							Filters
						</h2>

						{/* Categories */}
						<div className='mb-6'>
							<h3 className='text-sm font-medium mb-3 text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide'>
								Categories
							</h3>
							<div className='space-y-2'>
								{categories?.map((c) => (
									<label
										key={c._id}
										className='flex items-center cursor-pointer group'
									>
										<input
											type='checkbox'
											onChange={(e) => handleCheck(e.target.checked, c._id)}
											className='w-4 h-4 text-primary bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border rounded focus:ring-primary focus:ring-2'
										/>
										<span className='ml-3 text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-primary transition-colors'>
											{c.name}
										</span>
									</label>
								))}
							</div>
						</div>

						{/* Brands */}
						<div className='mb-6'>
							<h3 className='text-sm font-medium mb-3 text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide'>
								Brands
							</h3>
							<div className='space-y-2'>
								{uniqueBrands?.map((brand) => (
									<label
										key={brand}
										className='flex items-center cursor-pointer group'
									>
										<input
											type='radio'
											name='brand'
											onChange={() => handleBrandClick(brand)}
											className='w-4 h-4 text-primary bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border focus:ring-primary focus:ring-2'
										/>
										<span className='ml-3 text-sm text-light-text-primary dark:text-dark-text-primary group-hover:text-primary transition-colors'>
											{brand}
										</span>
									</label>
								))}
							</div>
						</div>

						{/* Price */}
						<div className='mb-6'>
							<h3 className='text-sm font-medium mb-3 text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide'>
								Price
							</h3>
							<input
								type='text'
								placeholder='Enter price...'
								value={priceFilter}
								onChange={handlePriceChange}
								className='w-full px-3 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted'
							/>
						</div>

						{/* Reset Button */}
						<button
							className='w-full px-4 py-2 bg-primary-light hover:bg-primary text-dark-text-primary font-medium rounded-lg transition-colors'
							onClick={() => window.location.reload()}
						>
							Reset Filters
						</button>
					</div>

					{/* Product Grid */}
					<div className='flex-1'>
						<div className='mb-6'>
							<p className='text-light-text-secondary dark:text-dark-text-secondary'>
								{products?.length}{" "}
								{products?.length === 1 ? "product" : "products"} found
							</p>
						</div>

						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
							{products.length === 0 ? (
								<div className='col-span-full flex items-center justify-center py-16'>
									<div className='text-center'>
										<Loader />
										<p className='mt-4 text-light-text-muted dark:text-dark-text-muted'>
											Loading products...
										</p>
									</div>
								</div>
							) : (
								products?.map((p) => (
									<div
										key={p._id}
										className='transform hover:scale-105 transition-transform duration-200'
									>
										<ProductCard p={p} />
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
