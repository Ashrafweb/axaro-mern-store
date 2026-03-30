/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
	const dispatch = useDispatch();

	const addToCartHandler = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
		toast.success("Item added successfully", {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 2000,
		});
	};

	return (
		<div className='group relative bg-light-card dark:bg-dark-card rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-light-border dark:border-dark-border'>
			{/* Image Section */}
			<div className='relative aspect-square overflow-hidden'>
				<Link to={`/product/${p._id}`}>
					<img
						className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
						src={p.image}
						alt={p.name}
					/>
				</Link>

				{/* Brand Badge */}
				<div className='absolute top-3 left-3'>
					<span className='bg-primary text-dark-text-primary text-xs font-semibold px-3 py-1 rounded-full shadow-sm'>
						{p?.brand}
					</span>
				</div>

				{/* Heart Icon */}
				<div className='absolute top-3 right-3'>
					<HeartIcon product={p} />
				</div>

				{/* Add to Cart Overlay */}
				<div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
					<button
						onClick={() => addToCartHandler(p, 1)}
						className='bg-primary text-dark-text-primary p-3 rounded-full shadow-lg hover:bg-primary-light transition-colors transform scale-90 group-hover:scale-100'
						title='Add to Cart'
					>
						<ShoppingCart size={20} />
					</button>
				</div>
			</div>

			{/* Content Section */}
			<div className='p-6 flex flex-col h-64'>
				<div className='mb-3 flex-shrink-0'>
					<h3 className='text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors h-12'>
						{p?.name}
					</h3>
					<p className='text-2xl font-bold text-primary'>
						${p?.price?.toFixed(2)}
					</p>
				</div>

				<p className='text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4 line-clamp-2 flex-grow'>
					{p?.description}
				</p>

				{/* Action Buttons */}
				<div className='flex items-center justify-between flex-shrink-0'>
					<Link
						to={`/product/${p._id}`}
						className='flex-1 mr-3 bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary hover:text-dark-text-primary transition-colors text-center'
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
