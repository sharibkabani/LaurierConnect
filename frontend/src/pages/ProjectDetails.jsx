"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
	FaUser,
	FaUsers,
	FaCheckCircle,
	FaTimesCircle,
} from "react-icons/fa";

// Simplified mock data
const mockProjects = [
	{
		id: 1,
		title: "AI-Powered Health Assistant",
		description:
			"Developing a mobile app that uses machine learning to provide personalized health recommendations.",
		owner: "Jane Smith",
		image:
			"https://static.vecteezy.com/system/resources/thumbnails/004/525/039/small/binary-code-background-abstract-technology-digital-binary-data-and-secure-data-concept-free-photo.jpg",
	},
	{
		id: 2,
		title: "Sustainable Fashion Marketplace",
		description:
			"Creating an e-commerce platform for sustainable and ethical fashion brands.",
		owner: "Mark Johnson",
		image:
			"https://static.vecteezy.com/system/resources/thumbnails/004/525/039/small/binary-code-background-abstract-technology-digital-binary-data-and-secure-data-concept-free-photo.jpg",
	},
	{
		id: 3,
		title: "Educational VR Experience",
		description:
			"Building a virtual reality application for interactive learning experiences in science education.",
		owner: "Sarah Williams",
		image:
			"https://static.vecteezy.com/system/resources/thumbnails/004/525/039/small/binary-code-background-abstract-technology-digital-binary-data-and-secure-data-concept-free-photo.jpg",
	},
	{
		id: 4,
		title: "Community Garden Management System",
		description:
			"Developing a system to help urban community gardens manage resources and volunteers.",
		owner: "David Chen",
		image:
			"https://static.vecteezy.com/system/resources/thumbnails/004/525/039/small/binary-code-background-abstract-technology-digital-binary-data-and-secure-data-concept-free-photo.jpg",
	},
	{
		id: 5,
		title: "Blockchain-based Voting System",
		description:
			"Creating a secure and transparent voting system using blockchain technology.",
		owner: "Michael Brown",
		image:
			"https://static.vecteezy.com/system/resources/thumbnails/004/525/039/small/binary-code-background-abstract-technology-digital-binary-data-and-secure-data-concept-free-photo.jpg",
	},
	{
		id: 6,
		title: "Accessibility Checker Browser Extension",
		description:
			"Building a browser extension that helps identify and fix accessibility issues on websites.",
		owner: "Lisa Garcia",
		image:
			"https://static.vecteezy.com/system/resources/thumbnails/004/525/039/small/binary-code-background-abstract-technology-digital-binary-data-and-secure-data-concept-free-photo.jpg",
	},
];

const ProjectDetails = () => {
	const { id } = useParams();
	const [project, setProject] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [applicationStatus, setApplicationStatus] = useState(null); // null, 'pending', 'accepted', 'rejected'

	useEffect(() => {
		// Simulate API fetch
		const fetchedProject = mockProjects.find(
			(proj) => proj.id === parseInt(id)
		);
		setTimeout(() => {
			setProject(fetchedProject || null);
			setIsLoading(false);
		}, 1000);
	}, [id]);

	const handleApply = () => {
		// Simulate application submission
		setApplicationStatus("pending");
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
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

	return (
		<div className="max-w-5xl mx-auto py-8 px-4">
			<div className="mb-6">
				<h1 className="text-3xl font-bold mb-2">{project.title}</h1>
			</div>

			<div className="flex flex-wrap gap-4 mb-8">
				<div className="flex items-center gap-2 text-gray-600">
					<FaUser />
					<span>{project.owner}</span>
				</div>
			</div>

			<div className="mb-8">
				<img
					src={
						project.image ||
						"https://via.placeholder.com/800x450?text=Project+Image"
					}
					alt={project.title}
					className="w-full h-auto rounded-lg shadow-md"
				/>
			</div>

			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4">About This Project</h2>
				<p className="text-gray-700">{project.description}</p>
			</div>

			<div className="mb-8">
				{applicationStatus === null && (
					<button
						className="px-6 py-2 bg-[rgb(var(--laurier-blue))] text-white rounded-lg hover:bg-[rgb(var(--laurier-purple))] transition-colors"
						onClick={handleApply}>
						<FaUsers className="inline-block mr-2" />
						Apply to Join
					</button>
				)}

				{applicationStatus === "pending" && (
					<div className="flex items-center gap-2 text-yellow-600">
						<FaCheckCircle />
						<p>Your application is pending review.</p>
					</div>
				)}

				{applicationStatus === "accepted" && (
					<div className="flex items-center gap-2 text-green-600">
						<FaCheckCircle />
						<p>Your application has been accepted!</p>
					</div>
				)}

				{applicationStatus === "rejected" && (
					<div className="flex items-center gap-2 text-red-600">
						<FaTimesCircle />
						<p>Your application was not accepted for this project.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectDetails;
