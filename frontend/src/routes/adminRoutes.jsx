import { lazy } from "react";
import AdminRoute from "../pages/Admin/AdminRoute";

const UserList = lazy(() => import("../pages/Admin/UserList"));
const CategoryList = lazy(() => import("../pages/Admin/CategoryList"));
const ProductList = lazy(() => import("../pages/Admin/ProductList"));
const AllProducts = lazy(() => import("../pages/Admin/AllProducts"));
const ProductUpdate = lazy(() => import("../pages/Admin/ProductUpdate"));
const OrderList = lazy(() => import("../pages/Admin/OrderList"));
const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));

export const adminRoutes = {
	path: "/admin",
	element: <AdminRoute />,
	children: [
		{ path: "userlist", element: <UserList /> },
		{ path: "categorylist", element: <CategoryList /> },
		{ path: "productlist", element: <ProductList /> },
		{ path: "allproductslist", element: <AllProducts /> },
		{ path: "productlist/:pageNumber", element: <ProductList /> },
		{ path: "product/update/:_id", element: <ProductUpdate /> },
		{ path: "orderlist", element: <OrderList /> },
		{ path: "dashboard", element: <AdminDashboard /> },
	],
};
