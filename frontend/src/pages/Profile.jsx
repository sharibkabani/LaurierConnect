"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import VideoReel from "../components/VideoReel.jsx"
import { FaStar, FaGraduationCap, FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub, FaEdit } from "react-icons/fa"

// Mock data - would be fetched from API in a real app
const mockUserProfile = {
  id: 101,
  name: "Jane Smith",
  title: "Full Stack Developer",
  bio: "Passionate developer with 5+ years of experience building web and mobile applications. Specializing in React, Node.js, and cloud infrastructure.",
  skills: ["React", "Node.js", "MongoDB", "Express", "AWS", "UI/UX Design", "JavaScript", "TypeScript"],
  rating: 4.8,
  education: "BSc Computer Science, Laurier University",
  location: "Waterloo, ON",
  email: "jane.smith@example.com",
  linkedin: "linkedin.com/in/janesmith",
  github: "github.com/janesmith",
  image: "https://via.placeholder.com/200x200?text=JS",
  projects: [
    {
      id: 1,
      title: "AI-Powered Health Assistant",
      description: "Mobile app using machine learning for personalized health recommendations",
      role: "Project Lead",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      thumbnail: "https://via.placeholder.com/400x225?text=Health+App",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment processing and inventory management",
      role: "Full Stack Developer",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      thumbnail: "https://via.placeholder.com/400x225?text=E-commerce",
    },
  ],
}

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCurrentUser, setIsCurrentUser] = useState(false)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProfile(mockUserProfile)
      // Check if this is the current user's profile
      // In a real app, this would compare the profile ID with the logged-in user's ID
      setIsCurrentUser(id === "me" || id === "101")
      setIsLoading(false)
    }, 1000)
  }, [id])

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="not-found">
        <h2>Profile Not Found</h2>
        <p>The user profile you're looking for doesn't exist or has been removed.</p>
        <Link to="/collaborators" className="back-link">
          Back to Collaborators
        </Link>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-image">
          <img src={profile.image || "/placeholder.svg"} alt={profile.name} />
        </div>

        <div className="profile-info">
          <div className="profile-name-section">
            <h1>{profile.name}</h1>
            {isCurrentUser && (
              <Link to="/edit-profile" className="edit-profile-btn">
                <FaEdit /> Edit Profile
              </Link>
            )}
          </div>

          <h2>{profile.title}</h2>

          <div className="profile-meta">
            <div className="meta-item">
              <FaStar className="star-icon" />
              <span>{profile.rating}</span>
            </div>
            <div className="meta-item">
              <FaGraduationCap />
              <span>{profile.education}</span>
            </div>
            <div className="meta-item">
              <FaMapMarkerAlt />
              <span>{profile.location}</span>
            </div>
          </div>

          <div className="profile-contact">
            <a href={`mailto:${profile.email}`} className="contact-link">
              <FaEnvelope /> Email
            </a>
            <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="contact-link">
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-bio">
          <h3>About</h3>
          <p>{profile.bio}</p>
        </div>

        <div className="profile-skills">
          <h3>Skills</h3>
          <div className="skills-container">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="profile-projects">
          <h3>Projects</h3>
          <div className="projects-showcase">
            {profile.projects.map((project) => (
              <div key={project.id} className="project-showcase-item">
                <VideoReel videoUrl={project.videoUrl} thumbnail={project.thumbnail} title={project.title} />
                <div className="project-showcase-info">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <span className="project-role">Role: {project.role}</span>
                  <Link to={`/projects/${project.id}`} className="view-project-link">
                    View Project Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

