/* eslint-disable no-unused-vars */
import Dashboard from "../../components/Dashboard";
import Account from "../User/AccountDetails";
import Order from "../Orders/Order";
import Favorites from "../Products/Favorites";
import OrderList from "./OrderList";
import CategoryList from "./CategoryList";
import Overview from "./Overview";
import UserList from "./UserList";
import AllProducts from "./AllProducts";
import { useSelector } from "react-redux";
import ProductList from "./ProductList";

const AdminDashboard = () => {
  const activeTab = useSelector((state) => state.auth.activeTab);
  console.log(activeTab);
  const ChildComponent = () => {
    console.log(activeTab);
    switch (activeTab) {
      case "account":
        return <Account />;

      case "orders":
        return <Order />;

      case "favourites":
        return <Favorites />;

      case "allOrders":
        return <OrderList />;

      case "products":
        return <AllProducts />;
      case "category":
        return <CategoryList />;
      case "dashboard":
        return <Overview />;
      case "allUsers":
        return <UserList />;
      case "addProduct":
        return <ProductList />;
      default:
        break;
    }
  };
  return (
    <>
      <Dashboard>
        <ChildComponent />
      </Dashboard>
    </>
  );
};

export default AdminDashboard;
