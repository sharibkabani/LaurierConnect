"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaEdit, FaTags } from "react-icons/fa";

const tagsList = [
	"Web Development",
	"Mobile App",
	"Machine Learning",
	"Data Science",
	"UI/UX Design",
	"Cloud Computing",
	"DevOps",
	"Blockchain",
	"Internet of Things",
	"Artificial Intelligence",
	"Game Development",
	"Cybersecurity",
	"Augmented Reality",
	"Virtual Reality",
	"Research",
];

const CreateProject = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		tags: [],
	});
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	// Check if user is logged in with useEffect to avoid React warnings
	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (!userId) {
			navigate("/login");
		} else {
			setIsCheckingAuth(false);
		}
	}, [navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleTagToggle = (tag) => {
		setFormData((prev) => {
			const tags = prev.tags.includes(tag)
				? prev.tags.filter((t) => t !== tag)
				: [...prev.tags, tag];
			return { ...prev, tags };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);

		if (!formData.title || !formData.description) {
			setError("Please fill in all required fields");
			setIsSubmitting(false);
			return;
		}

		if (formData.tags.length === 0) {
			setError("Please select at least one tag");
			setIsSubmitting(false);
			return;
		}

		const userId = localStorage.getItem("userId");
		if (!userId) {
			setError("You must be logged in to create a project");
			setIsSubmitting(false);
			return;
		}

		try {
			const projectData = {
				title: formData.title,
				description: formData.description,
				tags: formData.tags,
				owner_id: userId,
			};

			console.log("Project data being sent:", projectData);

			const response = await fetch("http://localhost:5001/create-project", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(projectData),
			});

			// First check if we got a valid response
			if (response.ok) {
				// For successful responses, try to parse JSON
				try {
					const data = await response.json();
					console.log("Project created successfully:", data);
					navigate(`/projects/${data.project_id}`);
				} catch (parseError) {
					console.error("Failed to parse successful response:", parseError);
					setError(
						"Project was created but there was an error processing the response"
					);
					setIsSubmitting(false);
				}
			} else {
				// For error responses, try to get more information
				const contentType = response.headers.get("content-type");

				if (contentType && contentType.includes("application/json")) {
					// If it's JSON, parse it normally
					const errorData = await response.json();
					setError(
						errorData.error ||
							`Error: ${response.status} - ${response.statusText}`
					);
				} else {
					// If it's not JSON (likely HTML error page), show status
					console.error(
						"Server returned non-JSON error:",
						await response.text()
					);
					setError(
						`Server error (${response.status}). Check console for details.`
					);
				}
			}
		} catch (error) {
			console.error("Error creating project:", error);
			setError("Network error. Please check your connection and try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Don't render anything while checking auth
	if (isCheckingAuth) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-12 h-12 border-4 border-t-[rgb(var(--laurier-blue))] border-gray-200 rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[rgb(var(--laurier-white))] py-12 px-4">
			<div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
				<h1 className="text-2xl font-bold text-[rgb(var(--laurier-black))] mb-6 text-center">
					Create a New Project
				</h1>

				{error && (
					<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))] mb-1">
							<FaFileAlt className="inline-block mr-2" /> Project Title{" "}
							<span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={formData.title}
							onChange={handleChange}
							placeholder="Enter a descriptive title for your project"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
							required
						/>
					</div>

					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-[rgb(var(--laurier-black))] mb-1">
							<FaEdit className="inline-block mr-2" /> Project Description{" "}
							<span className="text-red-500">*</span>
						</label>
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="Describe your project in detail. What is it about? What are the goals? What skills are needed?"
							rows="6"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--laurier-blue))]"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-[rgb(var(--laurier-black))] mb-2">
							<FaTags className="inline-block mr-2" /> Project Tags{" "}
							<span className="text-red-500">*</span>
						</label>
						<p className="text-sm text-gray-500 mb-3">
							Select tags that best describe your project (at least one)
						</p>
						<div className="flex flex-wrap gap-2">
							{tagsList.map((tag) => (
								<button
									type="button"
									key={tag}
									onClick={() => handleTagToggle(tag)}
									className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
										formData.tags.includes(tag)
											? "bg-[rgb(var(--laurier-blue))] text-white"
											: "bg-gray-200 text-gray-700"
									} hover:bg-[rgb(var(--laurier-purple))] hover:text-white`}>
									{tag}
								</button>
							))}
						</div>
					</div>

					<div className="flex gap-4 pt-4">
						<button
							type="button"
							onClick={() => navigate(-1)}
							className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors">
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className={`flex-1 px-4 py-2 bg-[rgb(var(--laurier-blue))] text-white rounded-lg font-medium hover:bg-[rgb(var(--laurier-purple))] transition-colors ${
								isSubmitting ? "opacity-70 cursor-not-allowed" : ""
							}`}>
							{isSubmitting ? "Creating..." : "Create Project"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateProject;
