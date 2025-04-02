"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../AuthContext";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	useEffect(() => {
		// Redirect if user is already logged in
		if (localStorage.getItem("userId")) {
			navigate(`/profile/${localStorage.getItem("userId")}`);
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!username || !password) {
			setError("Please enter both username and password");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("username", username);
			formData.append("password", password);

			const response = await fetch("http://localhost:5001/login", {
				method: "POST",
				body: formData,
			});
			const data = await response.json();
			if (response.ok) {
				const id = data.user_id;
				login(id); // Store userId in localStorage and update context
				navigate(`/profile/${id}`);
			} else {
				setError(data.error || "Login failed. Please try again.");
			}
		} catch (error) {
			console.error("Error during login:", error);
			return;
		}
	};

	return (
		<div className="min-h-screen bg-[rgb(var(--laurier-white))] flex items-center justify-center px-4">
			<div className="max-w-md w-full bg-[rgb(var(--laurier-white))] border border-gray-200 rounded-lg shadow-lg p-8">
				<div className="text-center mb-6">
					<h1 className="text-2xl font-bold text-[rgb(var(--laurier-black))]">
						Welcome Back
					</h1>
					<p className="text-gray-600">
						Sign in to continue to Laurier Connect
					</p>
				</div>

				{error && <div className="text-red-600 text-sm mb-4">{error}</div>}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaUser className="inline-block mr-2" /> Username
						</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter your username"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaLock className="inline-block mr-2" /> Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))] py-2 rounded-lg hover:bg-[rgb(var(--laurier-purple))] transition-all">
						Sign In
					</button>
				</form>

				<div className="text-center mt-6">
					<p className="text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))]">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
