"use client";

import { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Collaborators = () => {
	const [collaborators, setCollaborators] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");

		const fetchCollaborators = async () => {
			try {
				const response = await fetch("http://localhost:5001/users");
				if (!response.ok) {
					throw new Error("Failed to fetch collaborators");
				}
				const data = await response.json();

				// Filter out the current user from the list
				const filteredCollaborators = storedUserId
					? data.filter((user) => user.user_id !== parseInt(storedUserId, 10))
					: data;

				setCollaborators(filteredCollaborators);
				setIsLoading(false);
			} catch (err) {
				console.error("Error fetching collaborators:", err);
				setError(err.message);
				setIsLoading(false);
			}
		};

		fetchCollaborators();
	}, []);

	// Handle case when skills might not be an array
	const formatSkills = (skills) => {
		if (!skills) return [];
		if (Array.isArray(skills)) return skills;
		try {
			// Try to parse if it's a JSON string
			return JSON.parse(skills);
		} catch (e) {
			// If parsing fails, treat as a single skill
			console.error("Error parsing skills:", e);
			return [skills];
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<div className="w-12 h-12 border-4 border-gray-300 border-t-[rgb(var(--laurier-blue))] rounded-full animate-spin mb-4"></div>
				<p className="text-gray-600 font-medium">Loading collaborators...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-center">
				<h2 className="text-2xl font-bold mb-4">Error</h2>
				<p className="text-gray-600 mb-6">{error}</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[rgb(var(--laurier-white))] py-8 px-4 md:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-[rgb(var(--laurier-black))] mb-8 text-center">
					Find Collaborators
				</h1>

				{collaborators.length === 0 ? (
					<div className="text-center p-8 bg-white rounded-lg shadow">
						<p className="text-gray-600">
							No other collaborators are available at the moment.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{collaborators.map((collaborator) => (
							<div
								key={collaborator.user_id}
								onClick={() => navigate(`/profile/${collaborator.user_id}`)}
								className="bg-[rgb(var(--laurier-white))] border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col cursor-pointer">
								<div className="flex items-center mb-4">
									<img
										src={
											collaborator.image || import.meta.env.VITE_PROFILE_IMAGE
										}
										alt={`${collaborator.first_name} ${collaborator.last_name}`}
										className="w-16 h-16 rounded-full object-cover mr-4"
									/>
									<div>
										<h3 className="text-lg font-bold text-[rgb(var(--laurier-black))]">
											{collaborator.first_name} {collaborator.last_name}
										</h3>
										<p className="text-sm text-gray-600">
											@{collaborator.username}
										</p>
									</div>
								</div>
								<div className="mb-4">
									<a
										href={`mailto:${collaborator.email}`}
										onClick={(e) => e.stopPropagation()} // Prevent card click when clicking email
										className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] text-sm flex items-center gap-1">
										<FaEnvelope /> {collaborator.email}
									</a>
								</div>
								<div className="mb-4">
									<h4 className="text-sm font-semibold text-[rgb(var(--laurier-black))] mb-2">
										Skills:
									</h4>
									<div className="flex flex-wrap gap-2">
										{formatSkills(collaborator.skills).map((skill, index) => (
											<span
												key={index}
												className="px-2 py-1 bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))] text-xs font-medium rounded-full">
												{skill}
											</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Collaborators;
