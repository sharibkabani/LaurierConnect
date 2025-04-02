"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

// Mock data - would be fetched from API in a real app
const mockUserProfile = {
	id: 101,
	name: "Jane Smith",
	skills: [
		"React",
		"Node.js",
		"MongoDB",
		"Express",
		"AWS",
		"UI/UX Design",
		"JavaScript",
		"TypeScript",
	],
	email: "jane.smith@example.com",
	linkedin: "linkedin.com/in/janesmith",
	github: "github.com/janesmith",
	image:
		"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
	projects: [
		{
			id: 1,
			title: "AI-Powered Health Assistant",
			description:
				"Mobile app using machine learning for personalized health recommendations",
			owner: "Jane Smith",
		},
		{
			id: 2,
			title: "E-commerce Platform",
			description:
				"Full-stack e-commerce solution with payment processing and inventory management",
			owner: "Jane Smith",
		},
	],
};

const Profile = () => {
	const { id } = useParams();
	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate API fetch
		setTimeout(() => {
			setProfile(mockUserProfile);
			setIsLoading(false);
		}, 1000);
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
					src={profile.image || "/placeholder.svg"}
					alt={profile.name}
					className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
				/>
				<div>
					<div className="flex items-center justify-between mb-2">
						<h1 className="text-2xl font-bold text-[rgb(var(--laurier-black))]">
							{profile.name}
						</h1>
					</div>
					<h2 className="text-lg text-gray-600">{profile.title}</h2>
					<div className="flex flex-wrap gap-4 mt-4">
						<a
							href={`mailto:${profile.email}`}
							className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] text-sm flex items-center gap-1">
							<FaEnvelope /> Email
						</a>
						<a
							href={`https://${profile.linkedin}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] text-sm flex items-center gap-1">
							<FaLinkedin /> LinkedIn
						</a>
						<a
							href={`https://${profile.github}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] text-sm flex items-center gap-1">
							<FaGithub /> GitHub
						</a>
					</div>
				</div>
			</div>

			<div className="mb-8">
				<h3 className="text-xl font-bold text-[rgb(var(--laurier-black))] mb-4">
					Skills
				</h3>
				<div className="flex flex-wrap gap-2">
					{profile.skills.map((skill, index) => (
						<span
							key={index}
							className="px-2 py-1 bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))] text-xs font-medium rounded-full">
							{skill}
						</span>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-xl font-bold text-[rgb(var(--laurier-black))] mb-4">
					Projects
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{profile.projects.map((project) => (
						<div key={project.id} className="relative">
							<ProjectCard project={project} />
							{project.owner === profile.name && (
								<span className="absolute top-2 right-2 bg-[rgb(var(--laurier-yellow))] text-[rgb(var(--laurier-black))] text-xs font-semibold px-2 py-1 rounded-full">
									Owner
								</span>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Profile;
