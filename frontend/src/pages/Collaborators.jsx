"use client";

import { useState, useEffect } from "react";
import CollaboratorCard from "../components/CollaboratorCard.jsx";

// Mock data - would be fetched from API in a real app
const mockCollaborators = [
	{
		id: 101,
		name: "Jane Smith",
		title: "Full Stack Developer",
		skills: ["React", "Node.js", "MongoDB", "UI/UX"],
		rating: 4.8,
		education: "Computer Science, Laurier University",
		location: "Waterloo, ON",
		image: "https://via.placeholder.com/150x150?text=JS",
	},
	{
		id: 102,
		name: "Alex Johnson",
		title: "Machine Learning Engineer",
		skills: ["Python", "TensorFlow", "Data Analysis", "Computer Vision"],
		rating: 4.9,
		education: "AI & Robotics, Laurier University",
		location: "Toronto, ON",
		image: "https://via.placeholder.com/150x150?text=AJ",
	},
	{
		id: 103,
		name: "Michael Brown",
		title: "UI/UX Designer",
		skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
		rating: 4.7,
		education: "Design, Laurier University",
		location: "Kitchener, ON",
		image: "https://via.placeholder.com/150x150?text=MB",
	},
	{
		id: 104,
		name: "Sarah Williams",
		title: "Mobile Developer",
		skills: ["React Native", "Swift", "Kotlin", "Firebase"],
		rating: 4.6,
		education: "Software Engineering, Laurier University",
		location: "Waterloo, ON",
		image: "https://via.placeholder.com/150x150?text=SW",
	},
	{
		id: 105,
		name: "David Chen",
		title: "Data Scientist",
		skills: ["Python", "R", "Machine Learning", "Statistical Analysis"],
		rating: 4.9,
		education: "Data Science, Laurier University",
		location: "Toronto, ON",
		image: "https://via.placeholder.com/150x150?text=DC",
	},
	{
		id: 106,
		name: "Lisa Garcia",
		title: "Backend Developer",
		skills: ["Node.js", "Python", "AWS", "Database Design"],
		rating: 4.8,
		education: "Computer Engineering, Laurier University",
		location: "Waterloo, ON",
		image: "https://via.placeholder.com/150x150?text=LG",
	},
];

const Collaborators = () => {
	const [collaborators, setCollaborators] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate API fetch
		setTimeout(() => {
			setCollaborators(mockCollaborators);
			setIsLoading(false);
		}, 1000);
	}, []);

	return (
		<div className="min-h-screen bg-[rgb(var(--laurier-white))] py-8 px-4 md:px-8">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-[rgb(var(--laurier-black))] mb-8 text-center">
					Find Collaborators
				</h1>
				{isLoading ? (
					<div className="flex flex-col items-center justify-center py-16">
						<div className="w-12 h-12 border-4 border-gray-300 border-t-[rgb(var(--laurier-blue))] rounded-full animate-spin mb-4"></div>
						<p className="text-gray-600 font-medium">
							Loading collaborators...
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{collaborators.length > 0 ? (
							collaborators.map((collaborator) => (
								<CollaboratorCard
									key={collaborator.id}
									collaborator={collaborator}
								/>
							))
						) : (
							<div className="col-span-full bg-white rounded-xl shadow-md p-8 text-center">
								<p className="text-gray-600">
									No collaborators found. Please try again later.
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Collaborators;
