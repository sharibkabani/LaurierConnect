import { Link } from "react-router-dom"
import { FaUser, FaCalendarAlt, FaTag } from "react-icons/fa"

const ProjectCard = ({ project }) => {
  const { id, title, description, owner, date, category, image, status } = project

  return (
    <div className="project-card">
      <div className="project-image">
        <img src={image || "https://via.placeholder.com/300x200?text=Project"} alt={title} />
        <div className={`project-status ${status.toLowerCase()}`}>{status}</div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-meta">
          <div className="meta-item">
            <FaUser />
            <span>{owner}</span>
          </div>
          <div className="meta-item">
            <FaCalendarAlt />
            <span>{date}</span>
          </div>
          <div className="meta-item">
            <FaTag />
            <span>{category}</span>
          </div>
        </div>
        <Link to={`/projects/${id}`} className="view-project-btn">
          View Project
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard

