import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
	const { data, isLoading, error } = useGetTopProductsQuery();

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg'>
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4'>
						Oops! Something went wrong
					</h1>
					<p className='text-light-text-secondary dark:text-dark-text-secondary'>
						Unable to load trending products. Please try again later.
					</p>
				</div>
			</div>
		);
	}

	return (
		<header className='bg-light-bg dark:bg-dark-bg'>
			{/* Hero Carousel */}
			<section className='relative'>
				<ProductCarousel />
			</section>

			{/* Trending Products Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-12'>
						<h2 className='text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4'>
							Trending Products
						</h2>
						<p className='text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto'>
							Discover our most popular items that customers can&apos;t get
							enough of
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
						{data?.map((product) => (
							<div
								key={product._id}
								className='transform hover:scale-105 transition-transform duration-300'
							>
								<SmallProduct product={product} />
							</div>
						))}
					</div>

					{/* Call to Action */}
					<div className='text-center mt-12'>
						<a
							href='/shop'
							className='inline-flex items-center px-8 py-3 bg-primary text-dark-text-primary font-medium rounded-lg hover:bg-primary-light transition-colors shadow-lg hover:shadow-xl'
						>
							View All Products
							<svg
								className='ml-2 w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</a>
					</div>
				</div>
			</section>
		</header>
	);
};

export default Header;
