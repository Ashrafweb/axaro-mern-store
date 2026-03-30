/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
	AiOutlineHome,
	AiOutlineShopping,
	AiOutlineLogin,
	AiOutlineUserAdd,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Navigation = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.cart);
	const location = useLocation();

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};

	const navItems = [
		{ name: "HOME", path: "/", icon: AiOutlineHome },
		{ name: "SHOP", path: "/shop", icon: AiOutlineShopping },
		{ name: "CART", path: "/cart", icon: AiOutlineShoppingCart },
		{ name: "FAVORITES", path: "/favorite", icon: FaHeart },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<div
			className={`hidden lg:flex flex-col justify-between p-4 text-dark-text-primary bg-dark-card border-r border-dark-border transition-all duration-300 ${
				isExpanded ? "w-64" : "w-16"
			} h-screen fixed left-0 top-16 z-30`}
		>
			{/* Navigation Items */}
			<div className='flex flex-col space-y-2'>
				{navItems.map((item) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.path}
							to={item.path}
							className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
								isActive(item.path)
									? "bg-primary text-dark-text-primary shadow-sm"
									: "text-dark-text-secondary hover:bg-dark-surface hover:text-dark-text-primary"
							}`}
						>
							<Icon
								size={24}
								className={`flex-shrink-0 ${isExpanded ? "mr-3" : ""}`}
							/>
							<span
								className={`font-medium transition-opacity duration-200 ${
									isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
								}`}
							>
								{item.name}
							</span>
							{item.path === "/cart" && cartItems.length > 0 && (
								<span className='ml-auto bg-primary text-dark-text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'>
									{cartItems.reduce((a, c) => a + c.qty, 0)}
								</span>
							)}
							{item.path === "/favorite" && <FavoritesCount />}
						</Link>
					);
				})}
			</div>

			{/* User Section */}
			<div className='relative'>
				{userInfo ? (
					<>
						<button
							onClick={toggleDropdown}
							className={`flex items-center p-3 rounded-lg transition-all duration-200 w-full ${
								isExpanded ? "" : "justify-center"
							} text-dark-text-secondary hover:bg-dark-surface hover:text-dark-text-primary`}
						>
							<div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center text-dark-text-primary font-medium flex-shrink-0'>
								{userInfo.username.charAt(0).toUpperCase()}
							</div>
							{isExpanded && (
								<span className='ml-3 font-medium truncate'>
									{userInfo.username}
								</span>
							)}
							{isExpanded && (
								<svg
									className={`ml-auto h-4 w-4 transition-transform ${
										dropdownOpen ? "rotate-180" : ""
									}`}
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							)}
						</button>

						{dropdownOpen && (
							<div className='absolute bottom-full left-0 right-0 mb-2 bg-dark-card border border-dark-border rounded-lg shadow-lg'>
								<div className='py-1'>
									{userInfo.isAdmin && (
										<>
											<Link
												to='/admin/dashboard'
												className='block px-4 py-2 text-sm text-dark-text-primary hover:bg-dark-surface'
											>
												Dashboard
											</Link>
											<Link
												to='/admin/productlist'
												className='block px-4 py-2 text-sm text-dark-text-primary hover:bg-dark-surface'
											>
												Products
											</Link>
											<Link
												to='/admin/categorylist'
												className='block px-4 py-2 text-sm text-dark-text-primary hover:bg-dark-surface'
											>
												Category
											</Link>
											<Link
												to='/admin/orderlist'
												className='block px-4 py-2 text-sm text-dark-text-primary hover:bg-dark-surface'
											>
												Orders
											</Link>
											<Link
												to='/admin/userlist'
												className='block px-4 py-2 text-sm text-dark-text-primary hover:bg-dark-surface'
											>
												Users
											</Link>
											<hr className='border-dark-border my-1' />
										</>
									)}
									<Link
										to='/profile'
										className='block px-4 py-2 text-sm text-dark-text-primary hover:bg-dark-surface'
									>
										Profile
									</Link>
									<button
										onClick={logoutHandler}
										className='w-full text-left px-4 py-2 text-sm text-dark-text-primary hover:bg-dark-surface'
									>
										Logout
									</button>
								</div>
							</div>
						)}
					</>
				) : (
					<div
						className={`space-y-2 ${
							isExpanded ? "" : "flex flex-col items-center"
						}`}
					>
						<Link
							to='/login'
							className={`flex items-center p-3 rounded-lg transition-all duration-200 text-dark-text-secondary hover:bg-dark-surface hover:text-dark-text-primary ${
								isExpanded ? "" : "justify-center"
							}`}
						>
							<AiOutlineLogin size={24} className='flex-shrink-0' />
							{isExpanded && <span className='ml-3 font-medium'>LOGIN</span>}
						</Link>
						<Link
							to='/register'
							className={`flex items-center p-3 rounded-lg transition-all duration-200 text-dark-text-secondary hover:bg-dark-surface hover:text-dark-text-primary ${
								isExpanded ? "" : "justify-center"
							}`}
						>
							<AiOutlineUserAdd size={24} className='flex-shrink-0' />
							{isExpanded && <span className='ml-3 font-medium'>REGISTER</span>}
						</Link>
					</div>
				)}
			</div>

			{/* Toggle Button */}
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className='absolute -right-3 top-1/2 transform -translate-y-1/2 bg-primary text-dark-text-primary p-1 rounded-full shadow-md hover:shadow-lg transition-shadow'
			>
				{isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
			</button>
		</div>
	);
};

export default Navigation;
