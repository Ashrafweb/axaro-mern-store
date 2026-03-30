import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./pages/Auth/Navbar";
import { useSelector } from "react-redux";
import { apptheme } from "./redux/features/theme/themeSlice";

const App = () => {
	const isDark = useSelector(apptheme);
	return (
		<div className={isDark ? "dark" : "light"}>
			<ToastContainer />
			<Navbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default App;
