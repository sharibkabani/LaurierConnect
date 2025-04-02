import { Link } from "react-router-dom";
import { FaStar, FaGraduationCap, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";

const CollaboratorCard = ({ collaborator }) => {
	const { id, name, title, skills, rating, education, location, image, linkedin, github } =
		collaborator;

	return (
		<div className="bg-[rgb(var(--laurier-white))] border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col">
			<div className="flex items-center mb-4">
				<img
					src={image || "https://via.placeholder.com/150x150?text=User"}
					alt={name}
					className="w-16 h-16 rounded-full object-cover mr-4"
				/>
				<div>
					<h3 className="text-lg font-bold text-[rgb(var(--laurier-black))]">
						{name}
					</h3>
					<p className="text-sm text-gray-600">{title}</p>
				</div>
			</div>
			<div className="mb-4">
				<div className="flex items-center text-sm text-gray-600 mb-2">
					<FaStar className="text-[rgb(var(--laurier-yellow))] mr-2" />
					<span>{rating}</span>
				</div>
				<div className="flex items-center text-sm text-gray-600 mb-2">
					<FaGraduationCap className="text-[rgb(var(--laurier-blue))] mr-2" />
					<span>{education}</span>
				</div>
				<div className="flex items-center text-sm text-gray-600">
					<FaMapMarkerAlt className="text-[rgb(var(--laurier-purple))] mr-2" />
					<span>{location}</span>
				</div>
			</div>
			<div className="mb-4">
				<h4 className="text-sm font-semibold text-[rgb(var(--laurier-black))] mb-2">
					Skills:
				</h4>
				<div className="flex flex-wrap gap-2">
					{skills.map((skill, index) => (
						<span
							key={index}
							className="px-2 py-1 bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))] text-xs font-medium rounded-full">
							{skill}
						</span>
					))}
				</div>
			</div>
			<div className="flex items-center justify-start gap-4 mb-4">
				{linkedin && (
					<a
						href={linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] text-lg">
						<FaLinkedin />
					</a>
				)}
				{github && (
					<a
						href={github}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] text-lg">
						<FaGithub />
					</a>
				)}
			</div>
			<Link
				to={`/profile/${id}`}
				className="mt-auto text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] font-semibold text-sm">
				View Profile →
			</Link>
		</div>
	);
};

export default CollaboratorCard;
