import React from "react";
import { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";

const UserProfile = lazy(() => import("../pages/User/UserProfile"));
const Profile = lazy(() => import("../pages/User/Profile"));
const Shipping = lazy(() => import("../pages/Orders/Shipping"));
const PlaceOrder = lazy(() => import("../pages/Orders/PlaceOrder"));
const Order = lazy(() => import("../pages/Orders/Order"));

export const privateRoutes = {
	path: "",
	element: <PrivateRoute />,
	children: [
		{ path: "user/dashboard", element: <UserProfile /> },
		{ path: "profile", element: <Profile /> },
		{ path: "shipping", element: <Shipping /> },
		{ path: "placeorder", element: <PlaceOrder /> },
		{ path: "order/:id", element: <Order /> },
	],
};
