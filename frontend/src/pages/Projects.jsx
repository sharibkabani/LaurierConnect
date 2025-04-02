"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { FaPlus, FaFilter, FaTimes } from "react-icons/fa";

// Common skill tags that might be used in projects
const commonSkills = [
	"Web Development",
	"Mobile App",
	"Machine Learning",
	"Data Science",
	"UI/UX Design",
	"Cloud Computing",
	"DevOps",
	"Blockchain",
	"Artificial Intelligence",
	"Game Development",
	"Cybersecurity",
	"Research",
];

const Projects = () => {
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [allProjects, setAllProjects] = useState([]);
	const [projectOwners, setProjectOwners] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [userId, setUserId] = useState(null);
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	useEffect(() => {
		// Get user ID from localStorage
		const storedUserId = localStorage.getItem("userId");
		if (storedUserId) {
			setUserId(parseInt(storedUserId, 10));
		}

		const fetchUserDataAndProjects = async () => {
			try {
				setIsLoading(true);
				let currentUserData = null;

				// If user is logged in, fetch their data to get joined projects
				if (storedUserId) {
					const userResponse = await fetch(
						`http://localhost:5001/users/${storedUserId}`
					);
					if (userResponse.ok) {
						currentUserData = await userResponse.json();
					} else {
						console.error("Failed to fetch user data");
					}
				}

				// Fetch all projects
				const projectsResponse = await fetch("http://localhost:5001/projects");
				if (!projectsResponse.ok) {
					throw new Error("Failed to fetch projects");
				}

				const projectsData = await projectsResponse.json();

				// Filter projects that the user doesn't own and hasn't joined
				let availableProjects = projectsData;
				if (storedUserId && currentUserData) {
					const currentUserId = parseInt(storedUserId, 10);

					// Get arrays of projects the user owns and has joined
					const ownedProjects = currentUserData.projects_owned || [];
					const joinedProjects = currentUserData.joined_projects || [];

					// Filter out both owned and joined projects
					availableProjects = projectsData.filter((project) => {
						const projectId = project.project_id;
						return (
							project.owner_id !== currentUserId &&
							!ownedProjects.includes(projectId) &&
							!joinedProjects.includes(projectId)
						);
					});
				}

				setAllProjects(availableProjects);
				setFilteredProjects(availableProjects);

				// Collect unique owner IDs
				const ownerIds = [
					...new Set(projectsData.map((project) => project.owner_id)),
				];

				// Fetch owner details for each project
				const ownerPromises = ownerIds.map((ownerId) =>
					fetch(`http://localhost:5001/users/${ownerId}`)
						.then((res) => res.json())
						.then((data) => [ownerId, data])
				);

				const ownersData = await Promise.all(ownerPromises);

				// Create a map of owner_id to owner data
				const ownersMap = ownersData.reduce((acc, [id, data]) => {
					acc[id] = data;
					return acc;
				}, {});

				setProjectOwners(ownersMap);
				setIsLoading(false);
			} catch (err) {
				console.error("Error fetching projects:", err);
				setError(err.message);
				setIsLoading(false);
			}
		};

		fetchUserDataAndProjects();
	}, []);

	// Filter projects based on selected skills
	useEffect(() => {
		if (selectedSkills.length === 0) {
			// If no skills selected, show all projects
			setFilteredProjects(allProjects);
		} else {
			// Filter projects that have at least one of the selected skills
			const filtered = allProjects.filter((project) => {
				// Look in both tags and skills arrays (if they exist)
				const projectSkills = [
					...(project.tags || []),
					...(project.skills || []),
				];

				return selectedSkills.some((skill) =>
					projectSkills.some((projectSkill) =>
						projectSkill.toLowerCase().includes(skill.toLowerCase())
					)
				);
			});

			setFilteredProjects(filtered);
		}
	}, [selectedSkills, allProjects]);

	const toggleSkill = (skill) => {
		setSelectedSkills((prev) =>
			prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
		);
	};

	const clearFilters = () => {
		setSelectedSkills([]);
	};

	if (error) {
		return (
			<div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
						<h2 className="text-lg font-semibold mb-2">
							Error Loading Projects
						</h2>
						<p>{error}</p>
						<button
							onClick={() => window.location.reload()}
							className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
							Try Again
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
					<h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
						Explore Projects
					</h1>
					<div className="flex gap-2">
						<button
							onClick={() => setIsFilterOpen(!isFilterOpen)}
							className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors">
							<FaFilter className="text-sm" /> Filter
						</button>
						{userId && (
							<Link
								to="/create-project"
								className="flex items-center justify-center gap-2 bg-[rgb(var(--laurier-blue))] hover:bg-[rgb(var(--laurier-purple))] text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-md">
								<FaPlus className="text-sm" /> Create Project
							</Link>
						)}
					</div>
				</div>

				{/* Filter panel */}
				{isFilterOpen && (
					<div className="bg-white rounded-lg shadow-md p-5 mb-6">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Filter by Skills
							</h3>
							<div className="flex gap-2">
								{selectedSkills.length > 0 && (
									<button
										onClick={clearFilters}
										className="text-sm text-gray-600 hover:text-red-500 flex items-center gap-1">
										<FaTimes className="text-xs" /> Clear Filters
									</button>
								)}
								<button
									onClick={() => setIsFilterOpen(false)}
									className="text-gray-500 hover:text-gray-700">
									✕
								</button>
							</div>
						</div>

						<div className="flex flex-wrap gap-2">
							{commonSkills.map((skill) => (
								<button
									key={skill}
									onClick={() => toggleSkill(skill)}
									className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
										selectedSkills.includes(skill)
											? "bg-[rgb(var(--laurier-blue))] text-white"
											: "bg-gray-200 text-gray-700"
									} hover:bg-[rgb(var(--laurier-purple))] hover:text-white`}>
									{skill}
								</button>
							))}
						</div>

						{selectedSkills.length > 0 && (
							<div className="mt-4 text-sm text-gray-500">
								Showing projects matching: {selectedSkills.join(", ")}
							</div>
						)}
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{isLoading ? (
						<div className="col-span-full flex flex-col items-center justify-center py-16">
							<div className="w-12 h-12 border-4 border-gray-300 border-t-[rgb(var(--laurier-blue))] rounded-full animate-spin mb-4"></div>
							<p className="text-gray-600 font-medium">Loading projects...</p>
						</div>
					) : filteredProjects.length > 0 ? (
						filteredProjects.map((project) => {
							const owner = projectOwners[project.owner_id] || {};
							const ownerName = owner
								? `${owner.first_name || ""} ${owner.last_name || ""}`
								: "Unknown Owner";

							return (
								<ProjectCard
									key={project.project_id}
									project={{
										id: project.project_id,
										title: project.title,
										description: project.description,
										owner: ownerName.trim(),
										image: import.meta.env.VITE_PROJECT_IMAGE,
										members: project.members?.length || 0,
										skills: project.skills || [],
										tags: project.tags || [],
										category: project.category || "Uncategorized",
										date: project.created_at
											? new Date(project.created_at).toLocaleDateString()
											: "N/A",
										status: project.members?.length >= 4 ? "Full" : "Open",
									}}
								/>
							);
						})
					) : (
						<div className="col-span-full bg-white rounded-xl shadow-md p-8 text-center">
							<p className="text-gray-600">
								{selectedSkills.length > 0
									? "No projects found matching your selected skills. Try different filters or clear all filters."
									: userId
									? "No available projects found. All projects are either owned by you or you've already joined them."
									: "No projects available. Log in to create your own project!"}
							</p>
							{selectedSkills.length > 0 && (
								<button
									onClick={clearFilters}
									className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors">
									Clear Filters
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Projects;
