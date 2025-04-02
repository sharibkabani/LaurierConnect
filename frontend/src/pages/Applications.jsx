"use client";

import { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import ApplicantCard from "../components/ApplicantCard";

const Applications = () => {
	const [ownedProjects, setOwnedProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		const fetchOwnedProjects = async () => {
			try {
				if (!userId) {
					throw new Error("You must be logged in to view applications.");
				}

				// Fetch projects owned by the user
				const response = await fetch(
					`http://localhost:5001/users/${userId}/projects`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch owned projects.");
				}

				const data = await response.json();
				const ownedProjectIds = data.projects_owned || [];

				// Fetch details for each owned project
				const projectPromises = ownedProjectIds.map((projectId) =>
					fetch(`http://localhost:5001/projects/${projectId}`).then((res) =>
						res.json()
					)
				);
				const projects = await Promise.all(projectPromises);

				// Fetch applicant details for each project
				const projectsWithApplicants = await Promise.all(
					projects.map(async (project) => {
						if (project.applications && project.applications.length > 0) {
							const applicantPromises = project.applications.map(
								(applicantId) =>
									fetch(`http://localhost:5001/users/${applicantId}`).then(
										(res) => res.json()
									)
							);
							const applicants = await Promise.all(applicantPromises);
							return { ...project, applicants };
						}
						return { ...project, applicants: [] };
					})
				);

				setOwnedProjects(projectsWithApplicants);
				setIsLoading(false);
			} catch (err) {
				console.error("Error fetching owned projects:", err);
				setError(err.message);
				setIsLoading(false);
			}
		};

		fetchOwnedProjects();
	}, [userId]);

	const handleApplicationAction = async (projectId, applicantId, action) => {
		try {
			const response = await fetch("http://localhost:5001/handle-application", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					user_id: applicantId,
					project_id: projectId,
					action: action,
				}),
			});

			if (response.ok) {
				// Update the UI after accepting/denying the application
				setOwnedProjects((prevProjects) =>
					prevProjects.map((project) =>
						project.project_id === projectId
							? {
									...project,
									applicants: project.applicants.filter(
										(applicant) => applicant.user_id !== applicantId
									),
							  }
							: project
					)
				);
			} else {
				const data = await response.json();
				alert(data.error || "Failed to process the application.");
			}
		} catch (err) {
			console.error("Error handling application:", err);
			alert("An error occurred. Please try again.");
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<div className="w-12 h-12 border-4 border-gray-300 border-t-[rgb(var(--laurier-blue))] rounded-full animate-spin mb-4"></div>
				<p className="text-gray-600 font-medium">Loading applications...</p>
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
					Applications
				</h1>
				{ownedProjects.length > 0 ? (
					<div className="space-y-8">
						{ownedProjects.map((project) => (
							<div
								key={project.project_id}
								className="bg-[rgb(var(--laurier-white))] border border-gray-200 rounded-lg p-6 shadow-md">
								<h2 className="text-xl font-bold text-[rgb(var(--laurier-black))] mb-4">
									{project.title}
								</h2>
								<p className="text-gray-600 mb-4">{project.description}</p>
								<h3 className="text-lg font-semibold text-[rgb(var(--laurier-black))] mb-4">
									Applicants
								</h3>
								{project.applicants && project.applicants.length > 0 ? (
									<div className="space-y-4">
										{project.applicants.map((applicant) => (
											<div
												key={applicant.user_id}
												className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
												<ApplicantCard applicant={applicant} />
												<div className="flex items-center gap-4">
													<button
														className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
														onClick={() =>
															handleApplicationAction(
																project.project_id,
																applicant.user_id,
																"accept"
															)
														}>
														<FaCheck className="inline-block mr-2" />
														Accept
													</button>
													<button
														className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
														onClick={() =>
															handleApplicationAction(
																project.project_id,
																applicant.user_id,
																"deny"
															)
														}>
														<FaTimes className="inline-block mr-2" />
														Deny
													</button>
												</div>
											</div>
										))}
									</div>
								) : (
									<p className="text-gray-600">
										No applicants for this project.
									</p>
								)}
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-600 text-center">
						You don't own any projects with applications.
					</p>
				)}
			</div>
		</div>
	);
};

export default Applications;
