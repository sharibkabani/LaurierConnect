"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import VideoReel from "../components/VideoReel.jsx"
import { FaUser, FaCalendarAlt, FaTag, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

// Mock data - would be fetched from API in a real app
const mockProjectDetails = {
  id: 1,
  title: "AI-Powered Health Assistant",
  description:
    "We are developing a mobile application that leverages machine learning algorithms to provide personalized health recommendations based on user data. The app will analyze lifestyle patterns, nutrition, and activity levels to offer tailored advice for improving overall wellness.",
  longDescription:
    "Our vision is to create an accessible health companion that empowers users to make informed decisions about their wellbeing. The app will feature real-time monitoring, personalized insights, and evidence-based recommendations.\n\nWe are looking for passionate individuals with expertise in mobile development, machine learning, and healthcare to join our team. This is an opportunity to work on a project with real-world impact and contribute to improving health outcomes through technology.",
  owner: {
    id: 101,
    name: "Jane Smith",
    image: "https://via.placeholder.com/100x100?text=JS",
    title: "AI Researcher",
  },
  date: "Oct 15, 2023",
  category: "Mobile App",
  status: "Open",
  videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  thumbnail: "https://via.placeholder.com/800x450?text=Project+Video+Thumbnail",
  skills: ["React Native", "Machine Learning", "UI/UX", "Healthcare Knowledge"],
  team: [
    {
      id: 101,
      name: "Jane Smith",
      role: "Project Lead",
      image: "https://via.placeholder.com/50x50?text=JS",
    },
    {
      id: 102,
      name: "Alex Johnson",
      role: "ML Engineer",
      image: "https://via.placeholder.com/50x50?text=AJ",
    },
  ],
  openPositions: ["UI/UX Designer", "React Native Developer", "Healthcare Consultant"],
}

const ProjectDetails = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [applicationStatus, setApplicationStatus] = useState(null) // null, 'pending', 'accepted', 'rejected'

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProject(mockProjectDetails)
      setIsLoading(false)
    }, 1000)
  }, [id])

  const handleApply = () => {
    // This would send an application to the backend in a real app
    setApplicationStatus("pending")
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading project details...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="not-found">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects" className="back-link">
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="project-details-page">
      <div className="project-header">
        <h1>{project.title}</h1>
        <div className={`project-status ${project.status.toLowerCase()}`}>{project.status}</div>
      </div>

      <div className="project-meta">
        <div className="meta-item">
          <FaUser />
          <span>
            <Link to={`/profile/${project.owner.id}`}>{project.owner.name}</Link>
          </span>
        </div>
        <div className="meta-item">
          <FaCalendarAlt />
          <span>{project.date}</span>
        </div>
        <div className="meta-item">
          <FaTag />
          <span>{project.category}</span>
        </div>
      </div>

      <div className="project-content">
        <div className="project-video">
          <VideoReel videoUrl={project.videoUrl} thumbnail={project.thumbnail} title={project.title} />
        </div>

        <div className="project-description">
          <h2>About This Project</h2>
          <p>{project.description}</p>
          <p>{project.longDescription}</p>

          <div className="skills-required">
            <h3>Skills Required</h3>
            <div className="skills-container">
              {project.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="project-team">
          <h2>Team</h2>
          <div className="team-members">
            {project.team.map((member) => (
              <div key={member.id} className="team-member">
                <img src={member.image || "/placeholder.svg"} alt={member.name} />
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="open-positions">
            <h3>Open Positions</h3>
            <ul>
              {project.openPositions.map((position, index) => (
                <li key={index}>{position}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="application-section">
        {applicationStatus === null && (
          <button className="apply-button" onClick={handleApply}>
            <FaUsers /> Apply to Join
          </button>
        )}

        {applicationStatus === "pending" && (
          <div className="application-status pending">
            <p>Your application is pending review</p>
          </div>
        )}

        {applicationStatus === "accepted" && (
          <div className="application-status accepted">
            <FaCheckCircle />
            <p>Your application has been accepted!</p>
          </div>
        )}

        {applicationStatus === "rejected" && (
          <div className="application-status rejected">
            <FaTimesCircle />
            <p>Your application was not accepted for this project</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetails

