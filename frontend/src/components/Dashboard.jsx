/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const Dashboard = ({ children, activeTab, setActiveTab }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const tabClass =
    "p-1 my-2 text-md hover:bg-slate-600 hover:text-white w-full";
  return (
    <div className='px-10 pb-10  '>
      <h1 className='text-4xl px-4 font-bold'>Dashboard</h1>
      <div className='flex flex-row justify-around items-start gap-x-20 pt-4  mt-4'>
        <aside className='w-0 sm:w-[20%] pb-4 rounded-md shadow-2xl shadow-gray-600  '>
          <ul className='list-none'>
            {userInfo.isAdmin && (
              <>
                <li className='text-center'>
                  <button
                    className={
                      (activeTab == "dashboard"
                        ? "font-bold text-orange-500 "
                        : " ") + tabClass
                    }
                    onClick={() => setActiveTab("overview")}
                  >
                    Dashboard
                  </button>
                </li>
                <li className='text-center'>
                  <button
                    className={
                      (activeTab == "categories"
                        ? "font-bold text-orange-500 "
                        : " ") + tabClass
                    }
                    onClick={() => setActiveTab("category")}
                  >
                    Category
                  </button>
                </li>
                <li className='text-center'>
                  <button
                    className={
                      (activeTab == "products"
                        ? "font-bold text-orange-500 "
                        : " ") + tabClass
                    }
                    onClick={() => setActiveTab("products")}
                  >
                    All Products
                  </button>
                </li>
                <li className='text-center'>
                  <button
                    className={
                      (activeTab == "allOrders"
                        ? "font-bold text-orange-500 "
                        : " ") + tabClass
                    }
                    onClick={() => setActiveTab("allOrders")}
                  >
                    Orders
                  </button>
                </li>
                <li className='text-center'>
                  <button
                    className={
                      (activeTab == "allUsers"
                        ? "font-bold text-orange-500 "
                        : " ") + tabClass
                    }
                    onClick={() => setActiveTab("allUsers")}
                  >
                    Users
                  </button>
                </li>
              </>
            )}
            <li className='text-center'>
              <button
                className={
                  (activeTab == "account"
                    ? "font-bold text-orange-500 "
                    : " ") + tabClass
                }
                onClick={() => setActiveTab("account")}
              >
                Account
              </button>
            </li>
            <li className='text-center'>
              <button
                className={
                  (activeTab == "favourites"
                    ? "font-bold text-orange-500 "
                    : " ") + tabClass
                }
                onClick={() => setActiveTab("favourites")}
              >
                Favourites
              </button>
            </li>
            <li className='text-center'>
              <button
                className={
                  (activeTab == "myorders"
                    ? "font-bold text-orange-500 "
                    : " ") + tabClass
                }
                onClick={() => setActiveTab("myorders")}
              >
                My Orders
              </button>
            </li>
            <li className='text-center'>
              <button
                className={
                  (activeTab == "address"
                    ? "font-bold text-orange-500 "
                    : " ") + tabClass
                }
                onClick={() => setActiveTab("address")}
              >
                Address
              </button>
            </li>
          </ul>
        </aside>
        <main className='content sm:max-w-[80%] flex-grow rounded-md shadow-2xl shadow-gray-500 '>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
