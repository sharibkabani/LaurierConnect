import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
	const { id, title, description, owner, image } = project;

	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col justify-between">
			<div>
				<div className="project-image mb-4">
					<img
						src={
							image ||
							"https://static.vecteezy.com/system/resources/thumbnails/004/525/039/small/binary-code-background-abstract-technology-digital-binary-data-and-secure-data-concept-free-photo.jpg"
						}
						alt={title}
						className="w-full h-40 object-cover rounded-md"
					/>
				</div>
				<h3 className="text-xl font-bold mb-2">{title}</h3>
				<p className="text-gray-600 mb-4">{description}</p>
			</div>
			<div>
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
