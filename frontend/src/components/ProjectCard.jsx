import { Link } from "react-router-dom";
import { FaTag } from "react-icons/fa";

const ProjectCard = ({ project }) => {
	const { id, title, description, owner, tags = [] } = project;

	// Create a truncated version of the description if it's too long
	const truncateDescription = (text, maxLength = 120) => {
		if (!text || text.length <= maxLength) return text;
		return text.substring(0, maxLength) + "...";
	};

	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
			<div className="flex-grow">
				<div className="project-image mb-4">
					<img
						src={import.meta.env.VITE_PROJECT_IMAGE}
						alt={title}
						className="w-full h-40 object-cover rounded-md"
					/>
				</div>
				<h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
				<p className="text-gray-600 mb-4 line-clamp-3 overflow-hidden">
					{truncateDescription(description)}
				</p>

				{/* Tags/Skills display */}
				{tags && tags.length > 0 && (
					<div className="mb-4">
						<div className="flex flex-wrap gap-1.5">
							{tags.slice(0, 3).map((tag, index) => (
								<span
									key={index}
									className="px-2 py-1 bg-[rgb(var(--laurier-blue))] text-white text-xs font-medium rounded-full flex items-center">
									<FaTag className="mr-1 text-xs" /> {tag}
								</span>
							))}
							{tags.length > 3 && (
								<span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
									+{tags.length - 3} more
								</span>
							)}
						</div>
					</div>
				)}
			</div>
			<div className="mt-auto pt-2 border-t border-gray-100">
				<p className="text-sm text-gray-500 mb-2">By {owner}</p>
				<Link
					to={`/projects/${id}`}
					className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] font-semibold self-start">
					View Project →
				</Link>
			</div>
		</div>
	);
};

export default ProjectCard;
