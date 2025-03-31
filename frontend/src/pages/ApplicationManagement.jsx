"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaCheckCircle, FaTimesCircle, FaEye, FaUser } from "react-icons/fa"

// Mock data - would be fetched from API in a real app
const mockApplications = [
  {
    id: 1,
    projectId: 1,
    projectTitle: "AI-Powered Health Assistant",
    applicantId: 103,
    applicantName: "Michael Brown",
    applicantImage: "https://via.placeholder.com/50x50?text=MB",
    applicantTitle: "UI/UX Designer",
    message:
      "I'm interested in joining your health assistant project. I have experience designing healthcare applications and would love to contribute my UI/UX skills to make the app intuitive and user-friendly.",
    status: "pending",
    date: "Oct 18, 2023",
  },
  {
    id: 2,
    projectId: 1,
    projectTitle: "AI-Powered Health Assistant",
    applicantId: 104,
    applicantName: "Sarah Williams",
    applicantImage: "https://via.placeholder.com/50x50?text=SW",
    applicantTitle: "Mobile Developer",
    message:
      "I specialize in React Native development and have worked on several health-related mobile apps. I'm excited about the potential of this project and would like to join as a mobile developer.",
    status: "pending",
    date: "Oct 17, 2023",
  },
  {
    id: 3,
    projectId: 2,
    projectTitle: "Sustainable Fashion Marketplace",
    applicantId: 105,
    applicantName: "David Chen",
    applicantImage: "https://via.placeholder.com/50x50?text=DC",
    applicantTitle: "Data Scientist",
    message:
      "I'm passionate about sustainability and have experience with recommendation algorithms that could help match users with ethical fashion choices based on their preferences.",
    status: "accepted",
    date: "Oct 15, 2023",
  },
  {
    id: 4,
    projectId: 2,
    projectTitle: "Sustainable Fashion Marketplace",
    applicantId: 106,
    applicantName: "Lisa Garcia",
    applicantImage: "https://via.placeholder.com/50x50?text=LG",
    applicantTitle: "Backend Developer",
    message:
      "I'd like to contribute to your sustainable fashion marketplace. I have experience building e-commerce platforms and am particularly interested in projects with a positive environmental impact.",
    status: "rejected",
    date: "Oct 14, 2023",
  },
]

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setApplications(mockApplications)
      setFilteredApplications(mockApplications)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (filter === "all") {
      setFilteredApplications(applications)
    } else {
      setFilteredApplications(applications.filter((app) => app.status === filter))
    }
  }, [filter, applications])

  const handleStatusChange = (applicationId, newStatus) => {
    // In a real app, this would make an API call to update the status
    const updatedApplications = applications.map((app) =>
      app.id === applicationId ? { ...app, status: newStatus } : app,
    )

    setApplications(updatedApplications)
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading applications...</p>
      </div>
    )
  }

  return (
    <div className="applications-page">
      <div className="page-header">
        <h1>Manage Applications</h1>
      </div>

      <div className="filter-tabs">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
          Pending
        </button>
        <button className={filter === "accepted" ? "active" : ""} onClick={() => setFilter("accepted")}>
          Accepted
        </button>
        <button className={filter === "rejected" ? "active" : ""} onClick={() => setFilter("rejected")}>
          Rejected
        </button>
      </div>

      <div className="applications-list">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <div key={application.id} className={`application-card ${application.status}`}>
              <div className="application-header">
                <div className="project-info">
                  <h3>
                    <Link to={`/projects/${application.projectId}`}>{application.projectTitle}</Link>
                  </h3>
                  <span className="application-date">{application.date}</span>
                </div>
                <div className={`application-status ${application.status}`}>
                  {application.status === "pending" && "Pending Review"}
                  {application.status === "accepted" && "Accepted"}
                  {application.status === "rejected" && "Rejected"}
                </div>
              </div>

              <div className="applicant-info">
                <img src={application.applicantImage || "/placeholder.svg"} alt={application.applicantName} />
                <div>
                  <Link to={`/profile/${application.applicantId}`} className="applicant-name">
                    {application.applicantName}
                  </Link>
                  <p className="applicant-title">{application.applicantTitle}</p>
                </div>
              </div>

              <div className="application-message">
                <p>{application.message}</p>
              </div>

              <div className="application-actions">
                <Link to={`/profile/${application.applicantId}`} className="view-profile-btn">
                  <FaUser /> View Profile
                </Link>

                {application.status === "pending" && (
                  <>
                    <button className="accept-btn" onClick={() => handleStatusChange(application.id, "accepted")}>
                      <FaCheckCircle /> Accept
                    </button>
                    <button className="reject-btn" onClick={() => handleStatusChange(application.id, "rejected")}>
                      <FaTimesCircle /> Reject
                    </button>
                  </>
                )}

                <Link to={`/projects/${application.projectId}`} className="view-project-btn">
                  <FaEye /> View Project
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-applications">
            <p>No applications match the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationManagement

