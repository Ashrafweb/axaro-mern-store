/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/auth/authSlice";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const Dashboard = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const activeTab = useSelector((state) => state.auth.activeTab);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sideBarClass =
    "hidden md:h-full left-0 md:relative md:block md:w-[20%] md:pb-4 md:rounded-md md:shadow-2xl md:shadow-gray-600 min-h-[400px] ";
  const mobileSidebarClass =
    (isMenuOpen ? "block " : "hidden ") +
    "w-[50%] md:hidden left-0 absolute top-[65px] bottom-0 h-screen bg-orange-600";

  const AdminideBarComponent = () => {
    const tabClass =
      "p-1 my-2 text-md hover:bg-slate-600 hover:text-white w-full";
    return (
      <>
        <ul className='list-none'>
          <button
            className='md:hidden p-4 text-center w-full'
            onClick={() => toggleMenu()}
          >
            <IoClose size={30} className='w-full' />
          </button>
          {userInfo.isAdmin ? (
            <>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "dashboard"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("dashboard"))}
                >
                  Dashboard
                </button>
              </li>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "addProduct"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("addProduct"))}
                >
                  Add Product
                </button>
              </li>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "category"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("category"))}
                >
                  Category
                </button>
              </li>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "products"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("products"))}
                >
                  All Products
                </button>
              </li>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "allOrders"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("allOrders"))}
                >
                  Orders
                </button>
              </li>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "allUsers"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("allUsers"))}
                >
                  Users
                </button>
              </li>
            </>
          ) : (
            <>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "account"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("account"))}
                >
                  Account
                </button>
              </li>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "favourites"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("favourites"))}
                >
                  Favourites
                </button>
              </li>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "myorders"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("myorders"))}
                >
                  My Orders
                </button>
              </li>
              <li className='text-center'>
                <button
                  className={
                    (activeTab === "address"
                      ? "font-bold text-orange-500 "
                      : " ") + tabClass
                  }
                  onClick={() => dispatch(setActiveTab("address"))}
                >
                  Address
                </button>
              </li>
            </>
          )}
        </ul>
      </>
    );
  };

  return (
    <div className='px-10 pb-10 min-h-screen '>
      <div className='flex justify-between items-center'>
        <button className='md:hidden' onClick={() => toggleMenu()}>
          <FaBars size={30} />
        </button>
        <h1 className='text-4xl px-4 font-bold text-gray-900 '>Dashboard</h1>
      </div>
      <div className='flex flex-row justify-around items-start gap-x-20 pt-4 mt-4'>
        <aside className={sideBarClass}>
          <AdminideBarComponent />
        </aside>
        <aside className={mobileSidebarClass}>
          <AdminideBarComponent />
        </aside>
        <main className='content sm:max-w-[80%] flex-grow rounded-md shadow-2xl shadow-gray-500 '>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
