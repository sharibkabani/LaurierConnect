"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	FaGoogle,
	FaLinkedin,
	FaGithub,
	FaUser,
	FaEnvelope,
	FaLock,
	FaLink,
} from "react-icons/fa";

const Register = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		linkedinLink: "",
		githubLink: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		if (
			!formData.firstName ||
			!formData.lastName ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			setError("Please fill in all fields");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
    }

		navigate("/");
	};

	return (
		<div className="min-h-screen bg-[rgb(var(--laurier-white))] flex items-center justify-center px-4">
			<div className="max-w-md w-full bg-[rgb(var(--laurier-white))] border border-gray-200 rounded-lg shadow-lg p-8">
				<div className="text-center mb-6">
					<h1 className="text-2xl font-bold text-[rgb(var(--laurier-black))]">
						Create an Account
					</h1>
					<p className="text-gray-600">
						Join Laurier Connect to collaborate on projects
					</p>
				</div>

				{error && <div className="text-red-600 text-sm mb-4">{error}</div>}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="firstName"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaUser className="inline-block mr-2" /> First Name
						</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							placeholder="Enter your first name"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
						/>
					</div>

					<div>
						<label
							htmlFor="lastName"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaUser className="inline-block mr-2" /> Last Name
						</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							placeholder="Enter your last name"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
						/>
					</div>

					<div>
						<label
							htmlFor="linkedinLink"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaLinkedin className="inline-block mr-2" /> LinkedIn Profile
						</label>
						<input
							type="url"
							id="linkedinLink"
							name="linkedinLink"
							value={formData.linkedinLink}
							onChange={handleChange}
							placeholder="Enter your LinkedIn profile URL"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
						/>
					</div>

					<div>
						<label
							htmlFor="githubLink"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaGithub className="inline-block mr-2" /> GitHub Profile
						</label>
						<input
							type="url"
							id="githubLink"
							name="githubLink"
							value={formData.githubLink}
							onChange={handleChange}
							placeholder="Enter your GitHub profile URL"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaEnvelope className="inline-block mr-2" /> Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email"
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
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Create a password"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
						/>
					</div>

					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaLock className="inline-block mr-2" /> Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder="Confirm your password"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))] py-2 rounded-lg hover:bg-[rgb(var(--laurier-purple))] transition-all">
						Sign Up
					</button>
				</form>

				{/* <div className="text-center mt-6">
					<p className="text-gray-600">Or sign up with</p>
					<div className="flex justify-center gap-4 mt-4">
						<button
							className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
							onClick={() => handleSocialRegister("Google")}>
							<FaGoogle /> Google
						</button>
						<button
							className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
							onClick={() => handleSocialRegister("LinkedIn")}>
							<FaLinkedin /> LinkedIn
						</button>
						<button
							className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all"
							onClick={() => handleSocialRegister("GitHub")}>
							<FaGithub /> GitHub
						</button>
					</div>
				</div> */}

				<div className="text-center mt-6">
					<p className="text-gray-600">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))]">
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
