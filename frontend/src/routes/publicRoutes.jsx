import { lazy } from "react";

const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));
const Home = lazy(() => import("../pages/Home"));
const Favorites = lazy(() => import("../pages/Products/Favorites"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Shop = lazy(() => import("../pages/Shop"));

export const publicRoutes = [
	{ index: true, element: <Home /> },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{ path: "/favorite", element: <Favorites /> },
	{ path: "/product/:id", element: <ProductDetails /> },
	{ path: "/cart", element: <Cart /> },
	{ path: "/shop", element: <Shop /> },
];
