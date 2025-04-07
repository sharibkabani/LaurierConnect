"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
	FaUser,
	FaUsers,
	FaCheckCircle,
	FaTimesCircle,
	FaCalendarAlt,
	FaTag,
	FaTrash,
} from "react-icons/fa";

const ProjectDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [project, setProject] = useState(null);
	const [members, setMembers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [applicationStatus, setApplicationStatus] = useState(null); // null, 'pending', 'accepted', 'rejected'
	const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);

	useEffect(() => {
		const fetchProjectDetails = async () => {
			try {
				// Get current user ID from localStorage
				const currentUserId = localStorage.getItem("userId");

				// Fetch project details
				const projectResponse = await fetch(
					`http://localhost:5001/projects/${id}`
				);
				if (!projectResponse.ok) {
					throw new Error("Failed to fetch project data");
				}

				const projectData = await projectResponse.json();
				setProject(projectData);

				// Check if current user is the project owner
				if (currentUserId && projectData.owner_id === parseInt(currentUserId)) {
					setIsCurrentUserOwner(true);
				}

				// Fetch member details if project has members
				if (projectData.members && projectData.members.length > 0) {
					const memberPromises = projectData.members.map((memberId) =>
						fetch(`http://localhost:5001/users/${memberId}`).then((res) =>
							res.json()
						)
					);
					const memberData = await Promise.all(memberPromises);
					setMembers(memberData);
				}

				// Check if the current user has already applied
				if (
					currentUserId &&
					projectData.applications &&
					projectData.applications.includes(parseInt(currentUserId))
				) {
					setApplicationStatus("pending");
				}

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching project data:", error);
				setIsLoading(false);
			}
		};

		fetchProjectDetails();
	}, [id]);

	const handleApply = async () => {
		try {
			// Get current user ID from localStorage
			const currentUserId = localStorage.getItem("userId");

			if (!currentUserId) {
				alert("You must be logged in to apply for a project");
				return;
			}

			const response = await fetch("http://localhost:5001/apply-project", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					user_id: currentUserId,
					project_id: id,
				}),
			});

			if (response.ok) {
				setApplicationStatus("pending");
			} else {
				const errorData = await response.json();
				console.error("Error applying to join:", errorData.error);
				alert(errorData.error || "Failed to apply to this project");
			}
		} catch (error) {
			console.error("Error applying to project:", error);
			alert("Failed to apply to this project");
		}
	};

	const handleDeleteProject = async () => {
		try {
			const response = await fetch(`http://localhost:5001/projects/${id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				// Redirect to projects page after deletion
				navigate("/projects");
			} else {
				const data = await response.json();
				alert(data.error || "Failed to delete project");
			}
		} catch (error) {
			console.error("Error deleting project:", error);
			alert("Failed to delete project");
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<div className="w-12 h-12 border-4 border-gray-300 border-t-[rgb(var(--laurier-blue))] rounded-full animate-spin mb-4"></div>
				<p className="text-gray-600 font-medium">Loading project details...</p>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-center">
				<h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
				<p className="text-gray-600 mb-6">
					The project you're looking for doesn't exist or has been removed.
				</p>
				<Link
					to="/projects"
					className="px-6 py-2 bg-[rgb(var(--laurier-blue))] text-white rounded-lg hover:bg-[rgb(var(--laurier-purple))] transition-colors">
					Back to Projects
				</Link>
			</div>
		);
	}

	// Calculate if the project is at max capacity
	const isAtMaxCapacity = members.length >= 4;
	const ownerData =
		members.find((member) => member.user_id === project.owner_id) || {};

	return (
		<div className="max-w-5xl mx-auto py-8 px-4">
			<div className="mb-6">
				<div className="flex flex-wrap justify-between items-center">
					<h1 className="text-3xl font-bold mb-2">{project.title}</h1>
					<div className="flex items-center gap-3">
						<span
							className={`px-3 py-1 rounded-full text-sm font-medium ${
								isAtMaxCapacity
									? "bg-red-100 text-red-800"
									: "bg-green-100 text-green-800"
							}`}>
							{isAtMaxCapacity ? "Team Full" : "Open"}
						</span>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-4 mb-8">
				<div className="flex items-center gap-2 text-gray-600">
					<FaUser />
					<Link
						to={`/profile/${project.owner_id}`}
						className="text-[rgb(var(--laurier-blue))] hover:underline">
						{`${ownerData.first_name || ""} ${ownerData.last_name || ""}`}
						{!ownerData.first_name && "(Owner)"}
					</Link>
				</div>

				{project.created_at && (
					<div className="flex items-center gap-2 text-gray-600">
						<FaCalendarAlt />
						<span>{new Date(project.created_at).toLocaleDateString()}</span>
					</div>
				)}

				{project.category && (
					<div className="flex items-center gap-2 text-gray-600">
						<FaTag />
						<span>{project.category}</span>
					</div>
				)}
			</div>

			{/* Smaller image container with max-height and centered */}
			<div className="mb-8 flex justify-center">
				<img
					src={import.meta.env.VITE_PROJECT_IMAGE}
					alt={project.title}
					className="max-h-80 rounded-lg shadow-md object-contain"
				/>
			</div>

			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4">About This Project</h2>
				<p className="text-gray-700">{project.description}</p>
			</div>

			{/* Tags/Skills display */}
			{project.tags && project.tags.length > 0 && (
				<div className="mb-8">
					<h3 className="text-xl font-bold text-gray-900 mb-4">Project Tags</h3>
					<div className="flex flex-wrap gap-2">
						{project.tags.map((tag, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-[rgb(var(--laurier-blue))] text-white text-xs font-medium rounded-full">
								{tag}
							</span>
						))}
					</div>
				</div>
			)}

			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4">Team Members</h2>
				{members.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{members.map((member) => (
							<Link
								to={`/profile/${member.user_id}`}
								key={member.user_id}
								className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
								<img
									src={import.meta.env.VITE_PROFILE_IMAGE}
									alt={member.first_name}
									className="w-10 h-10 rounded-full object-cover mr-3"
								/>
								<div>
									<p className="font-medium">{`${member.first_name} ${member.last_name}`}</p>
									<p className="text-sm text-gray-500">@{member.username}</p>
								</div>
								{member.user_id === project.owner_id && (
									<span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
										Owner
									</span>
								)}
							</Link>
						))}
					</div>
				) : (
					<p className="text-gray-600">
						No members have joined this project yet.
					</p>
				)}
			</div>

			{/* Only show apply options if user is not the owner */}
			{!isCurrentUserOwner && (
				<div className="mb-8">
					{applicationStatus === null && !isAtMaxCapacity && (
						<button
							className="px-6 py-2 bg-[rgb(var(--laurier-blue))] text-white rounded-lg hover:bg-[rgb(var(--laurier-purple))] transition-colors"
							onClick={handleApply}>
							<FaUsers className="inline-block mr-2" />
							Apply to Join
						</button>
					)}

					{isAtMaxCapacity && applicationStatus === null && (
						<div className="flex items-center gap-2 text-gray-600 border border-gray-300 rounded-lg p-4 bg-gray-50">
							<FaUsers className="text-gray-500" />
							<p>This project has reached maximum capacity (4 members).</p>
						</div>
					)}

					{applicationStatus === "pending" && (
						<div className="flex items-center gap-2 text-yellow-600 border border-yellow-200 rounded-lg p-4 bg-yellow-50">
							<FaCheckCircle />
							<p>Your application is pending review.</p>
						</div>
					)}

					{applicationStatus === "accepted" && (
						<div className="flex items-center gap-2 text-green-600 border border-green-200 rounded-lg p-4 bg-green-50">
							<FaCheckCircle />
							<p>
								Your application has been accepted! You are now a team member.
							</p>
						</div>
					)}

					{applicationStatus === "rejected" && (
						<div className="flex items-center gap-2 text-red-600 border border-red-200 rounded-lg p-4 bg-red-50">
							<FaTimesCircle />
							<p>Your application was not accepted for this project.</p>
						</div>
					)}
				</div>
			)}

			{/* Add Delete Project button for project owners */}
			{isCurrentUserOwner && (
				<div className="mt-8 border-t pt-6">
					<button
						onClick={() => setShowConfirmation(true)}
						className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
						<FaTrash className="inline-block mr-2" />
						Delete Project
					</button>
				</div>
			)}

			{/* Confirmation Dialog */}
			{showConfirmation && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
						<h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
						<p className="text-gray-700 mb-6">
							Are you sure you want to delete this project? This action cannot
							be undone.
						</p>
						<div className="flex justify-end gap-4">
							<button
								onClick={() => setShowConfirmation(false)}
								className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
								Cancel
							</button>
							<button
								onClick={handleDeleteProject}
								className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectDetails;
