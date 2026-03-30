import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { RouterProvider } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { router } from "./routes";
import Loader from "./components/Loader";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PayPalScriptProvider>
			<Suspense fallback={<Loader />}>
				<RouterProvider router={router} />
			</Suspense>
		</PayPalScriptProvider>
	</Provider>
);
