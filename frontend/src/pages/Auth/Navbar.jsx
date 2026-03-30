/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ThemeToggle from "../../components/theme-toggle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import {
	ShoppingCartIcon,
	Menu,
	X,
	User,
	LogOut,
	LogIn,
	Heart,
	Shield,
} from "lucide-react";
import logoUrl from "../../assets/logo_axaro.png";

const Navbar = () => {
	const [isSticky, setIsSticky] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { userInfo } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.cart);
	const location = useLocation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const [logoutApiCall] = useLogoutMutation();

	const logOutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};

	const navItems = [
		{ name: "Home", path: "/" },
		{ name: "Shop", path: "/shop" },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<>
			{/* Overlay for mobile menu */}
			{isMobileMenuOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isSticky
						? "bg-light-card/95 dark:bg-dark-card/95 backdrop-blur-md shadow-lg border-b border-light-border dark:border-dark-border"
						: "bg-light-bg dark:bg-dark-bg"
				}`}
			>
				<div className='container px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						{/* Logo */}
						<div className='flex-shrink-0'>
							<Link to='/' className='flex items-center'>
								<img src={logoUrl} className='h-8 w-auto' alt='Axaro Logo' />
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center space-x-8'>
							{navItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
										isActive(item.path)
											? "bg-slate-800 text-dark-text-primary"
											: "text-light-text-primary dark:text-dark-text-primary hover:text-primary hover:bg-light-surface dark:hover:bg-dark-surface"
									}`}
								>
									{item.name}
								</Link>
							))}
						</div>

						{/* Right side actions */}
						<div className='flex items-center space-x-4'>
							{/* Cart */}
							<Link
								to='/cart'
								className='relative p-2 text-light-text-primary dark:text-dark-text-primary hover:text-primary transition-colors'
							>
								<ShoppingCartIcon size={20} />
								{cartItems.length > 0 && (
									<span className='absolute -top-1 -right-1 bg-primary text-dark-text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'>
										{cartItems.reduce((a, c) => a + c.qty, 0)}
									</span>
								)}
							</Link>

							{/* Theme Toggle */}
							<ThemeToggle />

							{/* User Menu */}
							{userInfo ? (
								<div className='relative group'>
									<button className='flex items-center space-x-2 p-2 rounded-md text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors'>
										<User size={20} />
										<span className='hidden sm:block text-sm font-medium'>
											{userInfo.username}
										</span>
									</button>

									<div className='absolute right-0 mt-2 w-48 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
										<div className='py-1'>
											{userInfo.isAdmin && (
												<Link
													to='/admin/dashboard'
													className='block px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface'
												>
													Admin Dashboard
												</Link>
											)}
											<Link
												to='/profile'
												className='block px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface'
											>
												Profile
											</Link>
											<Link
												to='/favorite'
												className='block px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface'
											>
												Favorites
											</Link>
											<hr className='border-light-border dark:border-dark-border my-1' />
											<button
												onClick={logOutHandler}
												className='w-full text-left px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface flex items-center space-x-2'
											>
												<LogOut size={16} />
												<span>Logout</span>
											</button>
										</div>
									</div>
								</div>
							) : (
								<Link
									to='/login'
									className='p-2 rounded-md text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors'
									title='Login'
								>
									<LogIn size={20} />
								</Link>
							)}

							{/* Mobile menu button */}
							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className='lg:hidden p-2 rounded-md text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors'
							>
								{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Navigation */}
				<div
					className={`lg:hidden transition-all duration-300 ${
						isMobileMenuOpen
							? "max-h-96 opacity-100"
							: "max-h-0 opacity-0 overflow-hidden"
					}`}
				>
					<div className='px-2 pt-2 pb-3 space-y-1 bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border'>
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								onClick={() => setIsMobileMenuOpen(false)}
								className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
									isActive(item.path)
										? "bg-primary text-dark-text-primary"
										: "text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface"
								}`}
							>
								{item.name}
							</Link>
						))}

						{/* Mobile user menu */}
						{userInfo && (
							<div className='border-t border-light-border dark:border-dark-border pt-3 mt-3 flex justify-center space-x-4'>
								{userInfo.isAdmin && (
									<Link
										to='/admin/dashboard'
										onClick={() => setIsMobileMenuOpen(false)}
										className='p-3 rounded-lg text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors'
										title='Admin Dashboard'
									>
										<Shield size={24} />
									</Link>
								)}
								<Link
									to='/profile'
									onClick={() => setIsMobileMenuOpen(false)}
									className='p-3 rounded-lg text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors'
									title='Profile'
								>
									<User size={24} />
								</Link>
								<Link
									to='/favorite'
									onClick={() => setIsMobileMenuOpen(false)}
									className='p-3 rounded-lg text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors'
									title='Favorites'
								>
									<Heart size={24} />
								</Link>
								<button
									onClick={() => {
										logOutHandler();
										setIsMobileMenuOpen(false);
									}}
									className='p-3 rounded-lg text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors'
									title='Logout'
								>
									<LogOut size={24} />
								</button>
							</div>
						)}
					</div>
				</div>
			</nav>

			{/* Spacer for fixed navbar */}
			<div className='h-16' />
		</>
	);
};

export default Navbar;
