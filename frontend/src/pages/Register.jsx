"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
	FaGoogle,
	FaLinkedin,
	FaGithub,
	FaUser,
	FaEnvelope,
	FaLock,
	FaLink,
	FaUserTag,
} from "react-icons/fa";

const skillsList = [
	"React",
	"Node.js",
	"Python",
	"Full-Stack",
	"Machine Learning",
	"UI/UX Design",
	"JavaScript",
	"TypeScript",
	"Data Science",
	"Cloud Computing",
	"Mobile Development",
	"DevOps",
	"Blockchain",
	"Database Design",
];

const Register = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		linkedinLink: "",
		githubLink: "",
		email: "",
		password: "",
		confirmPassword: "",
		skills: [],
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	useEffect(() => {
		// Redirect if user is already logged in
		if (localStorage.getItem("userId")) {
			navigate(`/profile/${localStorage.getItem("userId")}`);
		}
	}, [navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSkillToggle = (skill) => {
		setFormData((prev) => {
			const skills = prev.skills.includes(skill)
				? prev.skills.filter((s) => s !== skill)
				: [...prev.skills, skill];
			return { ...prev, skills };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (
			!formData.firstName ||
			!formData.lastName ||
			!formData.username ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			setError("Please fill in all required fields");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (formData.skills.length < 3) {
			setError("Please select at least 3 skills");
			return;
		}

		try {
			const userData = {
				first_name: formData.firstName,
				last_name: formData.lastName,
				username: formData.username,
				email: formData.email,
				password: formData.password,
				linkedin: formData.linkedinLink,
				github: formData.githubLink,
				skills: formData.skills,
			};

			const response = await fetch("http://localhost:5001/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (response.ok) {
				const data = await response.json();
				login(data.user_id); // Store userId in localStorage and update context
				navigate(`/profile/${data.user_id}`);
			} else {
				const data = await response.json();
				setError(data.error || "Registration failed. Please try again.");
			}
		} catch (error) {
			console.error("Error during registration:", error);
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-[rgb(var(--laurier-white))] flex items-center justify-center px-4">
			<div className="max-w-md w-full bg-[rgb(var(--laurier-white))] border border-gray-200 rounded-lg shadow-lg p-8">
				<div className="text-center mb-6">
					<h1 className="text-2xl font-bold text-[rgb(var(--laurier-black))]">
						Create an Account
					</h1>
				</div>

				{error && <div className="text-red-600 text-sm mb-4">{error}</div>}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="firstName"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaUser className="inline-block mr-2 mb-2" /> First Name
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
							<FaUser className="inline-block mr-2 mb-2" /> Last Name
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

					{/* Added username field */}
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaUserTag className="inline-block mr-2 mb-2" /> Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							placeholder="Choose a username"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
						/>
					</div>

					<div>
						<label
							htmlFor="linkedinLink"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))]">
							<FaLinkedin className="inline-block mr-2 mb-2" /> LinkedIn Profile
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
							<FaGithub className="inline-block mr-2 mb-2" /> GitHub Profile
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
							<FaEnvelope className="inline-block mr-2 mb-2" /> Email
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
							<FaLock className="inline-block mr-2 mb-2" /> Password
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
							<FaLock className="inline-block mr-2 mb-2" /> Confirm Password
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

					<div>
						<label className="block text-sm font-medium text-[rgb(var(--laurier-black))] mb-2">
							Select Your Skills
						</label>
						<div className="flex flex-wrap gap-2">
							{skillsList.map((skill) => (
								<button
									type="button"
									key={skill}
									onClick={() => handleSkillToggle(skill)}
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										formData.skills.includes(skill)
											? "bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))]"
											: "bg-gray-200 text-gray-700"
									} hover:bg-[rgb(var(--laurier-purple))] hover:text-[rgb(var(--laurier-white))] transition-all`}>
									{skill}
								</button>
							))}
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))] py-2 rounded-lg hover:bg-[rgb(var(--laurier-purple))] transition-all">
						Sign Up
					</button>
				</form>

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
