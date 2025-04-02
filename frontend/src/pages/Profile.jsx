"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const Profile = () => {
	const { id } = useParams();
	const [profile, setProfile] = useState({
		id: null,
		user_id: null,
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		linkedin: "",
		github: "",
		skills: [],
		image: import.meta.env.VITE_PROFILE_IMAGE,
		projects_owned: [],
		joined_projects: [],
	});
	const [ownedProjects, setOwnedProjects] = useState([]);
	const [joinedProjects, setJoinedProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [projectOwners, setProjectOwners] = useState({});

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				// Fetch user profile
				const profileResponse = await fetch(
					`http://localhost:5001/users/${id}`
				);
				if (!profileResponse.ok) {
					throw new Error("Failed to fetch profile data");
				}

				const profileData = await profileResponse.json();

				// Parse skills if they come as a JSON string
				let parsedSkills = [];
				if (profileData.skills) {
					// Check if skills is a string and attempt to parse it
					if (typeof profileData.skills === "string") {
						try {
							parsedSkills = JSON.parse(profileData.skills);
						} catch (e) {
							console.error("Error parsing skills:", e);
							parsedSkills = [profileData.skills]; // Fallback to treating it as a single skill
						}
					} else if (Array.isArray(profileData.skills)) {
						parsedSkills = profileData.skills;
					}
				}

				// Set profile with necessary transformations
				setProfile({
					...profileData,
					id: profileData.user_id,
					name: `${profileData.first_name} ${profileData.last_name}`,
					skills: parsedSkills,
					linkedin: profileData.linkedin || "",
					github: profileData.github || "",
				});

				// Fetch projects owned by user
				if (
					profileData.projects_owned &&
					profileData.projects_owned.length > 0
				) {
					const ownedProjectsPromises = profileData.projects_owned.map(
						(projectId) =>
							fetch(`http://localhost:5001/projects/${projectId}`).then((res) =>
								res.json()
							)
					);
					const ownedProjectsData = await Promise.all(ownedProjectsPromises);
					setOwnedProjects(ownedProjectsData);
				}

				// Fetch projects joined by user
				if (
					profileData.joined_projects &&
					profileData.joined_projects.length > 0
				) {
					const joinedProjectsPromises = profileData.joined_projects.map(
						(projectId) =>
							fetch(`http://localhost:5001/projects/${projectId}`).then((res) =>
								res.json()
							)
					);
					const joinedProjectsData = await Promise.all(joinedProjectsPromises);
					setJoinedProjects(joinedProjectsData);

					// Fetch owner data for each joined project
					const ownerIds = joinedProjectsData.map(
						(project) => project.owner_id
					);
					const uniqueOwnerIds = [...new Set(ownerIds)];

					const ownersData = {};
					await Promise.all(
						uniqueOwnerIds.map(async (ownerId) => {
							const ownerResponse = await fetch(
								`http://localhost:5001/users/${ownerId}`
							);
							if (ownerResponse.ok) {
								const ownerData = await ownerResponse.json();
								ownersData[ownerId] = {
									name: `${ownerData.first_name} ${ownerData.last_name}`,
									username: ownerData.username,
								};
							}
						})
					);

					setProjectOwners(ownersData);
				}

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, [id]);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<div className="w-12 h-12 border-4 border-gray-300 border-t-[rgb(var(--laurier-blue))] rounded-full animate-spin mb-4"></div>
				<p className="text-gray-600 font-medium">Loading profile...</p>
			</div>
		);
	}

	if (!profile) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-center">
				<h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
				<p className="text-gray-600 mb-6">
					The user profile you're looking for doesn't exist or has been removed.
				</p>
				<Link
					to="/collaborators"
					className="px-6 py-2 bg-[rgb(var(--laurier-blue))] text-white rounded-lg hover:bg-[rgb(var(--laurier-purple))] transition-colors">
					Back to Collaborators
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto py-8 px-4">
			<div className="flex flex-col md:flex-row items-center md:items-start mb-8">
				<img
					src={profile.image || import.meta.env.VITE_PROFILE_IMAGE}
					alt={profile.name}
					className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
				/>
				<div>
					<div className="flex items-center justify-between mb-2">
						<h1 className="text-2xl font-bold text-gray-900">
							{profile.name || `${profile.first_name} ${profile.last_name}`}
						</h1>
					</div>
					<h2 className="text-lg text-gray-600">@{profile.username}</h2>
					<div className="flex flex-wrap gap-4 mt-4">
						<a
							href={`mailto:${profile.email}`}
							className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
							<FaEnvelope /> {profile.email}
						</a>
						{profile.linkedin && (
							<a
								href={
									profile.linkedin.startsWith("http")
										? profile.linkedin
										: `https://${profile.linkedin}`
								}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
								<FaLinkedin /> LinkedIn
							</a>
						)}
						{profile.github && (
							<a
								href={
									profile.github.startsWith("http")
										? profile.github
										: `https://${profile.github}`
								}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
								<FaGithub /> GitHub
							</a>
						)}
					</div>
				</div>
			</div>

			{profile.skills && profile.skills.length > 0 && (
				<div className="mb-8">
					<h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
					<div className="flex flex-wrap gap-2">
						{profile.skills.map((skill, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-[rgb(var(--laurier-blue))] text-white text-xs font-medium rounded-full">
								{skill}
							</span>
						))}
					</div>
				</div>
			)}

			{/* Projects Owned */}
			{ownedProjects.length > 0 && (
				<div className="mb-8">
					<h3 className="text-xl font-bold text-gray-900 mb-4">
						Projects Owned
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{ownedProjects.map((project) => (
							<div key={project.project_id} className="relative">
								<ProjectCard
									project={{
										id: project.project_id,
										title: project.title,
										description: project.description,
										owner: `${profile.first_name} ${profile.last_name}`,
										image: import.meta.env.VITE_PROJECT_IMAGE,
									}}
								/>
								<span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded-full">
									Owner
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Projects Joined */}
			{joinedProjects.length > 0 && (
				<div>
					<h3 className="text-xl font-bold text-gray-900 mb-4">
						Projects Joined
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{joinedProjects.map((project) => (
							<ProjectCard
								key={project.project_id}
								project={{
									id: project.project_id,
									title: project.title,
									description: project.description,
									owner: projectOwners[project.owner_id]
										? projectOwners[project.owner_id].name
										: "Project Owner",
									image: import.meta.env.VITE_PROJECT_IMAGE,
								}}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
