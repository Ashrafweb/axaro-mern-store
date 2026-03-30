import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	useGetProductDetailsQuery,
	useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
	Package,
	Clock,
	ShoppingCart,
	Star,
	Store,
	ArrowLeft,
	Minus,
	Plus,
} from "lucide-react";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
	const { id: productId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(productId);

	const { userInfo } = useSelector((state) => state.auth);

	const [createReview, { isLoading: loadingProductReview }] =
		useCreateReviewMutation();

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			await createReview({
				productId,
				rating,
				comment,
			}).unwrap();
			refetch();
			toast.success("Review created successfully");
		} catch (error) {
			toast.error(error?.data || error.message);
		}
	};

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate("/cart");
	};

	const incrementQty = () => {
		if (qty < product.countInStock) {
			setQty(qty + 1);
		}
	};

	const decrementQty = () => {
		if (qty > 1) {
			setQty(qty - 1);
		}
	};

	const truncateDescription = (text, wordLimit = 100) => {
		const words = text.split(" ");
		if (words.length <= wordLimit) return text;
		return words.slice(0, wordLimit).join(" ") + "...";
	};

	return (
		<div className='min-h-screen bg-light-bg dark:bg-dark-bg'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Back Button */}
				<div className='mb-8'>
					<Link
						to='/shop'
						className='inline-flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors'
					>
						<ArrowLeft size={20} className='mr-2' />
						Back to Shop
					</Link>
				</div>

				{isLoading ? (
					<div className='flex items-center justify-center py-16'>
						<Loader />
					</div>
				) : error ? (
					<div className='text-center py-16'>
						<Message variant='danger'>
							{error?.data?.message || error.message}
						</Message>
					</div>
				) : (
					<>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
							{/* Product Image */}
							<div className='relative'>
								<div className='aspect-square rounded-2xl overflow-hidden bg-light-surface dark:bg-dark-surface'>
									<img
										src={product.image}
										alt={product.name}
										className='w-full h-full object-cover'
									/>
								</div>
								<div className='absolute top-4 right-4'>
									<HeartIcon product={product} />
								</div>
							</div>

							{/* Product Info */}
							<div className='space-y-6'>
								<div>
									<h1 className='text-3xl lg:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4'>
										{product.name}
									</h1>
									<div className='text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed'>
										<p>
											{isDescriptionExpanded
												? product.description
												: truncateDescription(product.description)}
										</p>
										{product.description.split(" ").length > 50 && (
											<button
												onClick={() =>
													setIsDescriptionExpanded(!isDescriptionExpanded)
												}
												className='mt-2 text-primary hover:text-primary-light font-medium transition-colors'
											>
												{isDescriptionExpanded ? "read less" : "..read more"}
											</button>
										)}
									</div>
								</div>

								{/* Price */}
								<div className='flex items-center space-x-4'>
									<span className='text-4xl font-bold text-primary'>
										${product.price?.toFixed(2)}
									</span>
									{product.countInStock > 0 ? (
										<span className='text-sm text-green-600 dark:text-green-400 font-medium'>
											In Stock
										</span>
									) : (
										<span className='text-sm text-red-600 dark:text-red-400 font-medium'>
											Out of Stock
										</span>
									)}
								</div>

								{/* Product Details */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-light-surface dark:bg-dark-surface rounded-xl'>
									<div className='flex items-center space-x-3'>
										<Store className='text-primary' size={20} />
										<div>
											<p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
												Brand
											</p>
											<p className='font-medium text-light-text-primary dark:text-dark-text-primary'>
												{product.brand}
											</p>
										</div>
									</div>

									<div className='flex items-center space-x-3'>
										<Clock className='text-primary' size={20} />
										<div>
											<p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
												Added
											</p>
											<p className='font-medium text-light-text-primary dark:text-dark-text-primary'>
												{moment(product.createAt).fromNow()}
											</p>
										</div>
									</div>

									<div className='flex items-center space-x-3'>
										<Star className='text-primary' size={20} />
										<div>
											<p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
												Rating
											</p>
											<p className='font-medium text-light-text-primary dark:text-dark-text-primary'>
												{product.rating?.toFixed(1)} ({product.numReviews}{" "}
												reviews)
											</p>
										</div>
									</div>

									<div className='flex items-center space-x-3'>
										<Package className='text-primary' size={20} />
										<div>
											<p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
												Stock
											</p>
											<p className='font-medium text-light-text-primary dark:text-dark-text-primary'>
												{product.countInStock} available
											</p>
										</div>
									</div>
								</div>

								{/* Quantity Selector */}
								{product.countInStock > 0 && (
									<div className='space-y-3'>
										<label className='block text-sm font-medium text-light-text-primary dark:text-dark-text-primary'>
											Quantity
										</label>
										<div className='flex items-center space-x-3'>
											<button
												onClick={decrementQty}
												className='p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-primary hover:text-dark-text-primary transition-colors'
												disabled={qty <= 1}
											>
												<Minus size={16} />
											</button>
											<span className='text-xl font-semibold text-light-text-primary dark:text-dark-text-primary min-w-[3rem] text-center'>
												{qty}
											</span>
											<button
												onClick={incrementQty}
												className='p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-primary hover:text-dark-text-primary transition-colors'
												disabled={qty >= product.countInStock}
											>
												<Plus size={16} />
											</button>
										</div>
									</div>
								)}

								{/* Add to Cart Button */}
								<button
									onClick={addToCartHandler}
									disabled={product.countInStock === 0}
									className='w-full bg-primary text-dark-text-primary py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
								>
									<ShoppingCart size={20} />
									<span>
										{product.countInStock === 0
											? "Out of Stock"
											: "Add to Cart"}
									</span>
								</button>

								{/* Ratings */}
								<div className='flex items-center space-x-4 pt-4 border-t border-light-border dark:border-dark-border'>
									<Ratings value={product.rating} />
									<span className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
										{product.numReviews} reviews
									</span>
								</div>
							</div>
						</div>

						{/* Product Tabs */}
						<div className='mt-16'>
							<ProductTabs
								loadingProductReview={loadingProductReview}
								userInfo={userInfo}
								submitHandler={submitHandler}
								rating={rating}
								setRating={setRating}
								comment={comment}
								setComment={setComment}
								product={product}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProductDetails;
