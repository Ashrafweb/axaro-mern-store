import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
import { adminRoutes } from "./adminRoutes";
import App from "../App";

const routes = [
	{
		path: "/",
		element: <App />,
		children: [...publicRoutes, privateRoutes, adminRoutes],
	},
];

export const router = createBrowserRouter(routes);
