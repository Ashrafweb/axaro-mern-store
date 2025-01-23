/* eslint-disable no-unused-vars */

import { useState } from "react";
import Dashboard from "../../components/Dashboard";
import Account from "../User/AccountDetails";
import Order from "../Orders/Order";
import Favorites from "../Products/Favorites";
import OrderList from "./OrderList";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import Overview from "./Overview";
import UserList from "./UserList";
import AllProducts from "./AllProducts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("account");
  const ChildComponent = () => {
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
      case "overview":
        return <Overview />;
      case "allUsers":
        return <UserList />;
      default:
        break;
    }
  };
  return (
    <>
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab}>
        <ChildComponent />
      </Dashboard>
    </>
  );
};

export default AdminDashboard;
