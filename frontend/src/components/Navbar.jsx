"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be managed by auth context in a real app

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogout = () => {
		setIsLoggedIn(false); // In a real app, this would call your logout API
	};

	return (
		<nav className="bg-[rgb(var(--laurier-white))] shadow-md sticky top-0 z-50">
			<div className="flex items-center justify-between px-4 md:px-8 py-4 max-w-7xl mx-auto">
				<Link to="/" className="flex items-center">
					<h1 className="text-[rgb(var(--laurier-blue))] text-xl font-bold">
						Laurier Connect
					</h1>
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
					} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 md:right-auto bg-[rgb(var(--laurier-white))] md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-50 md:items-center space-y-4 md:space-y-0 md:space-x-6`}>
					<li className="text-center md:text-left">
						<Link
							to="/projects"
							className="text-[rgb(var(--laurier-black))] font-medium hover:text-[rgb(var(--laurier-blue))] transition-colors"
							onClick={() => setIsMenuOpen(false)}>
							Projects
						</Link>
					</li>
					<li className="text-center md:text-left">
						<Link
							to="/collaborators"
							className="text-[rgb(var(--laurier-black))] font-medium hover:text-[rgb(var(--laurier-blue))] transition-colors"
							onClick={() => setIsMenuOpen(false)}>
							Collaborators
						</Link>
					</li>

					{isLoggedIn ? (
						<>
							<li className="text-center md:text-left">
								<Link
									to="/applications"
									className="text-[rgb(var(--laurier-black))] font-medium hover:text-[rgb(var(--laurier-blue))] transition-colors"
									onClick={() => setIsMenuOpen(false)}>
									Applications
								</Link>
							</li>
							<li className="text-center md:text-left">
								<Link
									to="/profile/me"
									className="flex items-center justify-center md:justify-start gap-2 text-[rgb(var(--laurier-black))] font-medium hover:text-[rgb(var(--laurier-blue))] transition-colors"
									onClick={() => setIsMenuOpen(false)}>
									<FaUser /> Profile
								</Link>
							</li>
							<li className="text-center md:text-left">
								<button
									className="w-full md:w-auto px-4 py-2 bg-[rgb(var(--laurier-white))] text-[rgb(var(--laurier-black))] rounded-lg font-medium hover:bg-[rgb(var(--laurier-purple))] hover:text-[rgb(var(--laurier-white))] transition-colors"
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
									className="block w-full md:w-auto px-4 py-2 border border-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-blue))] rounded-lg font-medium hover:bg-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-white))] transition-colors"
									onClick={() => setIsMenuOpen(false)}>
									Login
								</Link>
							</li>
							<li className="text-center md:text-left">
								<Link
									to="/register"
									className="block w-full md:w-auto px-4 py-2 bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))] rounded-lg font-medium hover:bg-opacity-90 transition-colors"
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
