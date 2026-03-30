/* eslint-disable react/prop-types */
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { adminNavItems } from "../Utils/navItems";

const AdminDashboardLayout = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className='px-4 md:px-10 pb-10 min-h-screen bg-gray-50'>
			{/* Mobile Backdrop */}
			{isMenuOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
					onClick={toggleMenu}
				/>
			)}
			<div className='flex justify-between items-center py-4'>
				<button
					className='md:hidden text-orange-600'
					onClick={() => toggleMenu()}
				>
					<FaBars size={30} />
				</button>
				<h1 className='text-2xl md:text-4xl px-4 font-bold text-gray-900'>
					Admin Dashboard
				</h1>
			</div>
			<div className='flex flex-row justify-around items-start gap-x-4 md:gap-x-6 pt-4 mt-4'>
				<Sidebar
					menuItems={adminNavItems}
					isMenuOpen={isMenuOpen}
					toggleMenu={toggleMenu}
				/>
				<main className='content w-full md:w-[75%] flex-grow rounded-xl shadow-xl shadow-gray-300/50 bg-white p-6'>
					{children}
				</main>
			</div>
		</div>
	);
};

export default AdminDashboardLayout;
