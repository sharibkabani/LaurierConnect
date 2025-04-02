import { Link } from "react-router-dom";

const ApplicantCard = ({ applicant }) => {
	const { user_id, first_name, last_name, skills } = applicant;

	return (
		<div className="flex items-center">
			<img
				src={import.meta.env.VITE_PROFILE_IMAGE}
				alt={`${first_name} ${last_name}`}
				className="w-12 h-12 rounded-full object-cover mr-4"
			/>
			<div>
				<Link
					to={`/profile/${user_id}`}
					className="text-[rgb(var(--laurier-blue))] hover:text-[rgb(var(--laurier-purple))] font-medium">
					{first_name} {last_name}
				</Link>
				<div className="flex flex-wrap gap-2 mt-2">
					{skills.map((skill, index) => (
						<span
							key={index}
							className="px-2 py-1 bg-[rgb(var(--laurier-blue))] text-[rgb(var(--laurier-white))] text-xs font-medium rounded-full">
							{skill}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default ApplicantCard;
