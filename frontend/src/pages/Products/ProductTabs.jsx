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
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 3;

	if (isLoading) {
		return <Loader />;
	}

	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
		if (tabNumber === 3) {
			setCurrentPage(1); // Reset to first page when switching to related products
		}
	};

	// Pagination logic for related products
	const totalPages = data ? Math.ceil(data.length / productsPerPage) : 0;
	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	const currentProducts = data ? data.slice(startIndex, endIndex) : [];

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const tabs = [
		{ id: 1, label: "Write Your Review", count: null },
		{ id: 2, label: "All Reviews", count: product?.reviews?.length || 0 },
		{ id: 3, label: "Related Products", count: data?.length || 0 },
	];

	return (
		<div className='bg-light-surface dark:bg-dark-surface rounded-2xl p-6 lg:p-8 shadow-sm'>
			<div className='mb-8'>
				<h2 className='text-2xl lg:text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6'>
					Product Details
				</h2>

				{/* Tab Navigation */}
				<div className='flex flex-col sm:flex-row gap-2 p-1 bg-light-bg dark:bg-dark-bg rounded-xl'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							className={`flex-1 min-w-0 px-3 sm:px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
								activeTab === tab.id
									? "bg-primary text-dark-text-primary shadow-md transform scale-[1.02]"
									: "text-light-text-secondary dark:text-dark-text-secondary hover:text-primary hover:bg-primary/5"
							}`}
							onClick={() => handleTabClick(tab.id)}
						>
							<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2'>
								<span className='block text-center sm:text-left leading-tight'>
									{tab.label}
								</span>
								{tab.count !== null && tab.count > 0 && (
									<span
										className={`self-center sm:self-auto px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${
											activeTab === tab.id
												? "bg-dark-text-primary/20 text-dark-text-primary"
												: "bg-primary/10 text-primary"
										}`}
									>
										{tab.count}
									</span>
								)}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Tab Content */}
			<div className='min-h-[400px]'>
				{activeTab === 1 && (
					<div className='space-y-6'>
						<div className='text-center py-8'>
							<h3 className='text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2'>
								Share Your Experience
							</h3>
							<p className='text-light-text-secondary dark:text-dark-text-secondary'>
								Help others by sharing your thoughts about this product
							</p>
						</div>

						{userInfo ? (
							<form onSubmit={submitHandler} className='space-y-6'>
								<div className='space-y-2'>
									<label
										htmlFor='rating'
										className='block text-sm font-medium text-light-text-primary dark:text-dark-text-primary'
									>
										Rating *
									</label>
									<select
										id='rating'
										required
										value={rating}
										onChange={(e) => setRating(e.target.value)}
										className='w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
									>
										<option value=''>Select a rating</option>
										<option value='1'>⭐ Poor</option>
										<option value='2'>⭐⭐ Fair</option>
										<option value='3'>⭐⭐⭐ Good</option>
										<option value='4'>⭐⭐⭐⭐ Very Good</option>
										<option value='5'>⭐⭐⭐⭐⭐ Excellent</option>
									</select>
								</div>

								<div className='space-y-2'>
									<label
										htmlFor='comment'
										className='block text-sm font-medium text-light-text-primary dark:text-dark-text-primary'
									>
										Your Review *
									</label>
									<textarea
										id='comment'
										rows='5'
										required
										value={comment}
										onChange={(e) => setComment(e.target.value)}
										placeholder='Tell others about your experience with this product...'
										className='w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none'
									/>
								</div>

								<button
									type='submit'
									disabled={loadingProductReview}
									className='w-full bg-primary text-dark-text-primary py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md'
								>
									{loadingProductReview ? (
										<>
											<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-dark-text-primary'></div>
											<span>Submitting Review...</span>
										</>
									) : (
										<>
											<span>Submit Review</span>
										</>
									)}
								</button>
							</form>
						) : (
							<div className='text-center py-12 px-6 bg-light-bg dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border'>
								<div className='mb-4'>
									<div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
										<svg
											className='w-8 h-8 text-primary'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
											/>
										</svg>
									</div>
									<h3 className='text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2'>
										Sign In to Write a Review
									</h3>
									<p className='text-light-text-secondary dark:text-dark-text-secondary mb-6'>
										Join our community and share your thoughts with other
										customers
									</p>
									<Link
										to='/login'
										className='inline-flex items-center px-6 py-3 bg-primary text-dark-text-primary font-medium rounded-xl hover:bg-primary-light transition-colors shadow-md'
									>
										Sign In
									</Link>
								</div>
							</div>
						)}
					</div>
				)}

				{activeTab === 2 && (
					<div className='space-y-6'>
						<div className='flex items-center justify-between'>
							<h3 className='text-xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
								Customer Reviews
							</h3>
							<span className='text-sm text-light-text-secondary dark:text-dark-text-secondary bg-light-bg dark:bg-dark-bg px-3 py-1 rounded-full'>
								{product?.reviews?.length || 0} reviews
							</span>
						</div>

						{product?.reviews?.length === 0 ? (
							<div className='text-center py-12 px-6 bg-light-bg dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border'>
								<div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
									<svg
										className='w-8 h-8 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
										/>
									</svg>
								</div>
								<h3 className='text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2'>
									No Reviews Yet
								</h3>
								<p className='text-light-text-secondary dark:text-dark-text-secondary'>
									Be the first to share your experience with this product
								</p>
							</div>
						) : (
							<div className='space-y-4'>
								{product.reviews.map((review) => (
									<div
										key={review._id}
										className='bg-light-bg dark:bg-dark-bg rounded-xl p-6 border border-light-border dark:border-dark-border hover:shadow-md transition-shadow'
									>
										<div className='flex items-start justify-between mb-4'>
											<div className='flex items-center space-x-3'>
												<div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
													<span className='text-primary font-semibold text-sm'>
														{review.name.charAt(0).toUpperCase()}
													</span>
												</div>
												<div>
													<h4 className='font-semibold text-light-text-primary dark:text-dark-text-primary'>
														{review.name}
													</h4>
													<p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
														{new Date(review.createdAt).toLocaleDateString(
															"en-US",
															{
																year: "numeric",
																month: "long",
																day: "numeric",
															}
														)}
													</p>
												</div>
											</div>
											<div className='flex items-center space-x-2'>
												<Ratings value={review.rating} />
												<span className='text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary'>
													{review.rating}/5
												</span>
											</div>
										</div>
										<p className='text-light-text-secondary dark:text-dark-text-secondary leading-relaxed'>
											{review.comment}
										</p>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{activeTab === 3 && (
					<div className='space-y-6'>
						<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
							<h3 className='text-xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
								Related Products
							</h3>
							<div className='flex items-center gap-4'>
								<span className='text-sm text-light-text-secondary dark:text-dark-text-secondary bg-light-bg dark:bg-dark-bg px-3 py-1 rounded-full'>
									{data?.length || 0} products
								</span>
								{totalPages > 1 && (
									<span className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
										Page {currentPage} of {totalPages}
									</span>
								)}
							</div>
						</div>

						{!data || data.length === 0 ? (
							<div className='text-center py-12 px-6 bg-light-bg dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border'>
								<div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
									<svg
										className='w-8 h-8 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
										/>
									</svg>
								</div>
								<h3 className='text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2'>
									No Related Products
								</h3>
								<p className='text-light-text-secondary dark:text-dark-text-secondary'>
									Check out our other products in the shop
								</p>
							</div>
						) : (
							<>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
									{currentProducts.map((product) => (
										<div
											key={product._id}
											className='transform hover:scale-105 transition-transform duration-200'
										>
											<SmallProduct product={product} />
										</div>
									))}
								</div>

								{totalPages > 1 && (
									<div className='flex items-center justify-center gap-2 mt-8'>
										<button
											onClick={() => handlePageChange(currentPage - 1)}
											disabled={currentPage === 1}
											className='px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary hover:text-dark-text-primary hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
										>
											Previous
										</button>

										<div className='flex gap-1'>
											{Array.from({ length: totalPages }, (_, i) => i + 1).map(
												(page) => (
													<button
														key={page}
														onClick={() => handlePageChange(page)}
														className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
															currentPage === page
																? "bg-primary text-dark-text-primary"
																: "bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary hover:text-dark-text-primary hover:border-primary"
														}`}
													>
														{page}
													</button>
												)
											)}
										</div>

										<button
											onClick={() => handlePageChange(currentPage + 1)}
											disabled={currentPage === totalPages}
											className='px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary hover:text-dark-text-primary hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
										>
											Next
										</button>
									</div>
								)}
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductTabs;
