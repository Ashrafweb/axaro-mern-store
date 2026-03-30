import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const addToCartHandler = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
	};

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate("/login?redirect=/shipping");
	};

	const incrementQty = (item) => {
		if (item.qty < item.countInStock) {
			addToCartHandler(item, item.qty + 1);
		}
	};

	const decrementQty = (item) => {
		if (item.qty > 1) {
			addToCartHandler(item, item.qty - 1);
		}
	};

	return (
		<div className='min-h-screen bg-light-bg dark:bg-dark-bg'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='text-3xl lg:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2'>
						Shopping Cart
					</h1>
					<p className='text-light-text-secondary dark:text-dark-text-secondary'>
						{cartItems.length === 0
							? "Your cart is empty"
							: `${cartItems.length} item${
									cartItems.length > 1 ? "s" : ""
							  } in your cart`}
					</p>
				</div>

				{cartItems.length === 0 ? (
					<div className='text-center py-12 px-4'>
						<ShoppingBag className='mx-auto h-16 w-16 sm:h-24 sm:w-24 text-light-text-secondary dark:text-dark-text-secondary mb-4 sm:mb-6' />
						<h2 className='text-xl sm:text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 sm:mb-4'>
							Your cart is empty
						</h2>
						<p className='text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary mb-6 sm:mb-8'>
							Add some products to get started
						</p>
						<Link
							to='/shop'
							className='inline-flex items-center bg-primary text-dark-text-primary px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-light transition-colors'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				) : (
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
						{/* Cart Items */}
						<div className='lg:col-span-2 space-y-3 sm:space-y-4'>
							{cartItems.map((item) => (
								<div
									key={item._id}
									className='bg-light-card dark:bg-dark-card rounded-xl shadow-sm border border-light-border dark:border-dark-border p-4 sm:p-6'
								>
									<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
										<div className='flex items-start gap-4 flex-1 min-w-0'>
											{/* Product Image */}
											<div className='relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0'>
												<img
													src={item.image}
													alt={item.name}
													className='w-full h-full object-cover rounded-lg'
												/>
											</div>

											{/* Product Details */}
											<div className='flex-1'>
												<Link
													to={`/product/${item._id}`}
													className='text-base sm:text-lg font-semibold text-light-text-primary dark:text-dark-text-primary hover:text-primary transition-colors line-clamp-2'
												>
													{item.name}
												</Link>
												<p className='text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1'>
													{item.brand}
												</p>
												<p className='text-lg sm:text-xl font-bold text-primary mt-1 sm:mt-2'>
													${item.price?.toFixed(2)}
												</p>
											</div>
										</div>

										<div className='flex items-center justify-between sm:justify-end sm:space-x-6 w-full sm:w-auto'>
											{/* Quantity Controls */}
											<div className='flex items-center space-x-2'>
												<button
													onClick={() => decrementQty(item)}
													className='p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-primary hover:text-dark-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation'
													disabled={item.qty <= 1}
												>
													<Minus size={16} />
												</button>
												<span className='text-base sm:text-lg font-semibold text-light-text-primary dark:text-dark-text-primary min-w-[2rem] text-center'>
													{item.qty}
												</span>
												<button
													onClick={() => incrementQty(item)}
													className='p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-primary hover:text-dark-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation'
													disabled={item.qty >= item.countInStock}
												>
													<Plus size={16} />
												</button>
											</div>

											{/* Item Total */}
											<div className='text-right sm:text-center'>
												<p className='text-base sm:text-lg font-bold text-light-text-primary dark:text-dark-text-primary'>
													${(item.qty * item.price).toFixed(2)}
												</p>
												<p className='text-xs text-light-text-secondary dark:text-dark-text-secondary sm:hidden'>
													{item.qty} × ${item.price?.toFixed(2)}
												</p>
											</div>

											{/* Remove Button */}
											<button
												onClick={() => removeFromCartHandler(item._id)}
												className='p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors touch-manipulation ml-2 sm:ml-0'
												title='Remove item'
											>
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className='lg:col-span-1'>
							<div className='bg-light-card dark:bg-dark-card rounded-xl shadow-sm border border-light-border dark:border-dark-border p-4 sm:p-6 lg:sticky lg:top-4'>
								<h2 className='text-lg sm:text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 sm:mb-6'>
									Order Summary
								</h2>

								<div className='space-y-3 sm:space-y-4'>
									<div className='flex justify-between items-center'>
										<span className='text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary'>
											Items (
											{cartItems.reduce((acc, item) => acc + item.qty, 0)})
										</span>
										<span className='font-semibold text-light-text-primary dark:text-dark-text-primary text-sm sm:text-base'>
											$
											{cartItems
												.reduce((acc, item) => acc + item.qty * item.price, 0)
												.toFixed(2)}
										</span>
									</div>

									<div className='flex justify-between items-center'>
										<span className='text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary'>
											Shipping
										</span>
										<span className='font-semibold text-light-text-primary dark:text-dark-text-primary text-sm sm:text-base'>
											Free
										</span>
									</div>

									<div className='flex justify-between items-center'>
										<span className='text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary'>
											Tax
										</span>
										<span className='font-semibold text-light-text-primary dark:text-dark-text-primary text-sm sm:text-base'>
											$0.00
										</span>
									</div>

									<div className='border-t border-light-border dark:border-dark-border pt-3 sm:pt-4'>
										<div className='flex justify-between items-center'>
											<span className='text-base sm:text-lg font-semibold text-light-text-primary dark:text-dark-text-primary'>
												Total
											</span>
											<span className='text-xl sm:text-2xl font-bold text-primary'>
												$
												{cartItems
													.reduce((acc, item) => acc + item.qty * item.price, 0)
													.toFixed(2)}
											</span>
										</div>
									</div>
								</div>

								<button
									className='w-full bg-primary text-dark-text-primary py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-base sm:text-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-4 sm:mt-6 touch-manipulation'
									disabled={cartItems.length === 0}
									onClick={checkoutHandler}
								>
									<span>Proceed to Checkout</span>
									<ArrowRight size={18} />
								</button>

								<Link
									to='/shop'
									className='block text-center mt-3 sm:mt-4 text-sm sm:text-base text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors'
								>
									Continue Shopping
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
