/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import ThemeToggle from "../../components/theme-toggle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logoUrl from "../../assets/logo_axaro.png";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

const Dropdown = ({ items, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative inline-block' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-orange-500 hover:text-white cursor-pointer'
      >
        {trigger}
      </button>
      {isOpen && (
        <div className='absolute right-0 top-10 w-[150px] bg-white dark:bg-gray-800 shadow-md rounded-md z-10 transition-opacity duration-300'>
          <ul className='list-none text-left'>
            {items.map((item, index) => (
              <li
                key={index}
                className={`text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-4 ${
                  index < items.length - 1
                    ? "border-b border-gray-200 dark:border-gray-700"
                    : ""
                }`}
              >
                {item.link ? (
                  <Link to={item.link} onClick={item.onClick}>
                    {item.text}
                  </Link>
                ) : (
                  <button onClick={item.onClick} className='w-full text-left'>
                    {item.text}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string,
      onClick: PropTypes.func,
    })
  ).isRequired,
  trigger: PropTypes.node.isRequired,
};

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 150 ? setIsSticky(true) : setIsSticky(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

  const MobileMenu = () => {
    return (
      <div
        className={`${
          isOpenMenu ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-full h-screen p-5 bg-white dark:bg-gray-900 transition-transform duration-300 sm:hidden`}
      >
        <div className='my-2 flex justify-between items-center'>
          {!userInfo ? (
            <div className='mr-2'>
              <Link to='../login'>
                <button
                  onClick={() => setOpenMenu(false)}
                  className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-6 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-600'
                >
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div className='grid'>
              <p className='text-orange-500 hover:text-white cursor-pointer'>
                Hi, {userInfo?.username}
              </p>
              <Link
                onClick={logOutHandler}
                to='/'
                className='px-4 font-semibold bg-orange-600 rounded-sm py-1 mt-1 text-white'
              >
                Logout
              </Link>
            </div>
          )}
        </div>
        <ul
          className='list-none text-center mt-10'
          onClick={() => setOpenMenu(false)}
        >
          <li className='py-2 hover:text-orange-500'>
            <Link to='/'>Home</Link>
          </li>
          <li className='py-2 hover:text-orange-500'>
            <Link to='/shop'>Shop</Link>
          </li>
          <li className='py-2 hover:text-orange-500'>
            <Link to='/categories'>Category</Link>
          </li>
          <li className='py-2 hover:text-orange-500'>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <nav
        className={`${
          isSticky ? "fixed top-0 left-0 w-full z-20 shadow-lg" : ""
        } bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600 transition-all duration-300`}
      >
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link to='/'>
            <img
              src={logoUrl}
              className='w-[100px] h-[20px] sm:h-[30px] object-cover'
              alt='Axaro Logo'
            />
          </Link>

          <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <div className='authMenu relative'>
              {!userInfo ? (
                <div className='mr-2'>
                  <Link to='../login'>
                    <button className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-6 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-600 transition-transform transform hover:scale-105'>
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <Dropdown
                  items={[
                    {
                      text: "Profile",
                      link: "/profile",
                    },
                    {
                      text: "Favorites",
                      link: "/favorite",
                    },
                    {
                      text: "Logout",
                      link: "/",
                      onClick: logOutHandler,
                    },
                  ]}
                  trigger={
                    <p className='hidden sm:block text-orange-500 hover:text-white cursor-pointer'>
                      Hi, {userInfo?.username}
                    </p>
                  }
                />
              )}
            </div>

            <div className='mx-2 px-2 sm:px-4 mt-2'>
              <Link to='/cart' className='flex relative'>
                <div className='flex items-center'>
                  <AiOutlineShoppingCart
                    className='mr-2 text-white'
                    size={26}
                  />
                </div>

                <div className='absolute top-[-10px] right-0'>
                  {cartItems.length > 0 && (
                    <span>
                      <span className='px-1 py-0 text-sm text-white bg-orange-500 rounded-full'>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </span>
                    </span>
                  )}
                </div>
              </Link>
            </div>
            <ThemeToggle />
            <button
              className='sm:hidden'
              onClick={() => setOpenMenu(!isOpenMenu)}
            >
              {isOpenMenu ? (
                <IoClose className='h-8 w-full font-bold text-white' />
              ) : (
                <FaBars className='h-8 w-full text-white' />
              )}
            </button>
          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-sticky'
          >
            <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <Link
                  to='/'
                  className='block py-2 px-3 text-white bg-orange-500 rounded md:bg-transparent md:text-orange-500 md:p-0 md:dark:text-orange-500 transition-transform transform hover:scale-105'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='../shop'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-transform transform hover:scale-105'
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isOpenMenu && <MobileMenu />}
    </div>
  );
};

export default Navbar;
