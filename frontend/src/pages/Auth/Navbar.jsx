/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ThemeToggle from "../../components/theme-toggle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logoUrl from "../../assets/logo_axaro.png";
import { FaBars, FaCross } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [openUserProfileModel, setOpenUserProfileModel] = useState(false);
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
      <>
        <div
          className={
            `${isOpenMenu ? " translate-x-0" : "-translate-x-full"} ` +
            " sm:hidden h-screen p-2 text-center  "
          }
        >
          <div className='my-2 flex justify-between items-center'>
            {!userInfo ? (
              <div className='mr-2'>
                <Link to='../login'>
                  <button
                    onClick={() => setOpenMenu(false)}
                    className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-bg-orange-600'
                  >
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div className='grid'>
                <p className='text-orange-500 hover:text-white cursor-pointer'>
                  Hi,{userInfo?.username}
                </p>
                <Link
                  onClick={logOutHandler}
                  to='/'
                  className='px-4 font-semibold bg-orange-600 rounded-sm py-1 mt-1 '
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
          <div>
            <ul className='list-none' onClick={() => setOpenMenu(false)}>
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
              <li className='py-2 hover:text-orange-500'>
                <Link to='/profile'></Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  return (
    <div>
      <nav
        className={`${
          isSticky ? "fixed top-0 left-0" : ""
        }  bg-white dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600`}
      >
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link to='/'>
            <img
              src={logoUrl}
              className='w-[100px] h-[20px] sm:h-[30px] object-cover  '
              alt='Axaro Logo'
            />
          </Link>

          <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            {/* <button
              type='button'
              className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-bg-orange-600'
            >
              Get started
            </button> */}
            <div className='authMenu'>
              {!userInfo ? (
                <div className='mr-2'>
                  <Link to='../login'>
                    <button className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-bg-orange-600'>
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <div
                  className='relative px-2 sm:pl-4'
                  onMouseOver={() => setOpenUserProfileModel(true)}
                >
                  <p className='hidden sm:block text-orange-500 hover:text-white cursor-pointer'>
                    Hi,{userInfo?.username}
                  </p>
                  <div
                    onMouseLeave={() => setOpenUserProfileModel(false)}
                    className={`${
                      openUserProfileModel ? "block " : "hidden "
                    }absolute right-0 top-10 w-[150px] h-max bg-white shadow-md`}
                  >
                    <ul className='list-none text-left'>
                      <li className='text-black text-md hover:bg-gray-200 w-full py-2 border-b-[1px] border-gray-400'>
                        <Link
                          to='/admin/dashboard'
                          className='px-4 font-semibold'
                        >
                          Profile
                        </Link>
                      </li>
                      <li className='text-black text-md hover:bg-gray-200 w-full py-2 border-b-[1px] border-gray-400'>
                        <Link to='/favorite' className='px-4 font-semibold'>
                          Favorites
                        </Link>
                      </li>
                      <li className='text-black text-md hover:bg-gray-200 w-full py-2 border-b-[1px] border-gray-400'>
                        <Link
                          onClick={logOutHandler}
                          to='/'
                          className='px-4 font-semibold'
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className='mx-2 px-2 sm:px-4 mt-2'>
              <Link to='/cart' className='flex relative'>
                <div className='flex items-center'>
                  <AiOutlineShoppingCart
                    className='mr-2 text-yellow-50'
                    size={26}
                  />
                  <span className='hidden nav-item-name '>Cart</span>{" "}
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
                <IoClose className='h-8 w-full font-bold ' />
              ) : (
                <FaBars className='h-8 w-full' />
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
                  className='block py-2 px-3 text-white bg-orange-500 rounded md:bg-transparent md:text-orange-500 md:p-0 md:dark:text-orange-500'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='../shop'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
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
