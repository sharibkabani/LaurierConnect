"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useAuth } from "../AuthContext";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { isLoggedIn, userId, logout } = useAuth();
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogout = () => {
		logout();
		navigate("/");
		setIsMenuOpen(false);
	};

	return (
		<nav className="bg-white shadow-md sticky top-0 z-50">
			<div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-7xl mx-auto">
				<Link to="/" className="flex items-center">
					<h1 className="text-blue-600 text-xl font-bold">Laurier Connect</h1>
				</Link>

				<div className="block md:hidden cursor-pointer" onClick={toggleMenu}>
					{isMenuOpen ? (
						<FaTimes className="text-gray-700 text-xl" />
					) : (
						<FaBars className="text-gray-700 text-xl" />
					)}
				</div>

				<ul
					className={`${
						isMenuOpen ? "flex" : "hidden"
					} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 md:right-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-50 md:items-center space-y-4 md:space-y-0 md:space-x-6`}>
					<li className="text-center md:text-left">
						<Link
							to="/projects"
							className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
							onClick={() => setIsMenuOpen(false)}>
							Projects
						</Link>
					</li>
					<li className="text-center md:text-left">
						<Link
							to="/collaborators"
							className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
							onClick={() => setIsMenuOpen(false)}>
							Collaborators
						</Link>
					</li>

					{isLoggedIn ? (
						<>
							<li className="text-center md:text-left">
								<Link
									to="/applications"
									className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
									onClick={() => setIsMenuOpen(false)}>
									Applications
								</Link>
							</li>
							<li className="text-center md:text-left">
								<Link
									to={`/profile/${userId}`}
									className="flex items-center justify-center md:justify-start gap-2 text-gray-800 font-medium hover:text-blue-600 transition-colors"
									onClick={() => setIsMenuOpen(false)}>
									<FaUser /> Profile
								</Link>
							</li>
							<li className="text-center md:text-left">
								<button
									className="w-full md:w-auto px-4 py-2 rounded-lg font-medium bg-purple-600 text-white transition-colors hover:bg-purple-700"
									onClick={handleLogout}>
									Logout
								</button>
							</li>
						</>
					) : (
						<>
							<li className="text-center md:text-left">
								<Link
									to="/login"
									className="block w-full md:w-auto px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
									onClick={() => setIsMenuOpen(false)}>
									Login
								</Link>
							</li>
							<li className="text-center md:text-left">
								<Link
									to="/register"
									className="block w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
									onClick={() => setIsMenuOpen(false)}>
									Register
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
