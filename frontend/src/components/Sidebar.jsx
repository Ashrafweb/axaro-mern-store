/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/auth/authSlice";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ menuItems, isMenuOpen, toggleMenu }) => {
	const activeTab = useSelector((state) => state.auth.activeTab);
	const dispatch = useDispatch();

	const tabClass =
		"p-3 my-1 text-sm font-medium hover:bg-orange-100 hover:text-orange-700 w-full rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105";

	return (
		<>
			{/* Desktop Sidebar */}
			<aside className='hidden md:flex md:flex-col md:h-full md:relative md:w-[22%] md:pb-6 md:rounded-xl md:shadow-xl md:shadow-gray-300/50 min-h-[500px] bg-gradient-to-b from-white to-gray-50 border border-gray-200'>
				<div className='p-6 border-b border-gray-200'>
					<h2 className='text-lg font-semibold text-gray-800'>Menu</h2>
				</div>
				<ul className='flex-1 list-none p-4 space-y-2'>
					{menuItems.map((item) => (
						<li key={item.key} className='text-center'>
							<button
								className={
									(activeTab === item.key
										? "bg-orange-500 text-white shadow-md "
										: "text-gray-700 ") + tabClass
								}
								onClick={() => dispatch(setActiveTab(item.key))}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</aside>

			{/* Mobile Sidebar */}
			<aside
				className={
					(isMenuOpen ? "translate-x-0 " : "-translate-x-full ") +
					"fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-orange-500 to-orange-600 text-white transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl"
				}
			>
				<div className='flex items-center justify-between p-4 border-b border-orange-400'>
					<h2 className='text-lg font-semibold'>Menu</h2>
					<button
						className='p-2 rounded-lg hover:bg-orange-400 transition-colors'
						onClick={toggleMenu}
					>
						<IoClose size={24} />
					</button>
				</div>
				<ul className='list-none p-4 space-y-3'>
					{menuItems.map((item) => (
						<li key={item.key} className='text-center'>
							<button
								className={
									(activeTab === item.key
										? "bg-white text-orange-600 shadow-lg "
										: "text-white hover:bg-orange-400 ") + tabClass
								}
								onClick={() => dispatch(setActiveTab(item.key))}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</aside>
		</>
	);
};

export default Sidebar;
