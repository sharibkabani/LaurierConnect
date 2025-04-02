"use client";

import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

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

const Projects = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		// Simulate API fetch
		setTimeout(() => {
			setProjects(mockProjects);
		}, 1000);
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
					Explore Projects
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.length > 0 ? (
						projects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))
					) : (
						<div className="col-span-full bg-white rounded-xl shadow-md p-8 text-center">
							<p className="text-gray-600">Loading projects...</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Projects;
