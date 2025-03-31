import { Link } from "react-router-dom"
import { FaStar, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa"

const CollaboratorCard = ({ collaborator }) => {
  const { id, name, title, skills, rating, education, location, image } = collaborator

  return (
    <div className="collaborator-card">
      <div className="collaborator-image">
        <img src={image || "https://via.placeholder.com/150x150?text=User"} alt={name} />
      </div>
      <div className="collaborator-content">
        <h3 className="collaborator-name">{name}</h3>
        <p className="collaborator-title">{title}</p>

        <div className="collaborator-meta">
          <div className="meta-item">
            <FaStar className="star-icon" />
            <span>{rating}</span>
          </div>
          <div className="meta-item">
            <FaGraduationCap />
            <span>{education}</span>
          </div>
          <div className="meta-item">
            <FaMapMarkerAlt />
            <span>{location}</span>
          </div>
        </div>

        <div className="skills-container">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>

        <Link to={`/profile/${id}`} className="view-profile-btn">
          View Profile
        </Link>
      </div>
    </div>
  )
}

export default CollaboratorCard

