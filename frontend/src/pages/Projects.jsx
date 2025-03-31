"use client"

import { useState, useEffect } from "react"
import ProjectCard from "../components/ProjectCard.jsx"
import FilterBar from "../components/FilterBar.jsx"
import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"

// Mock data - would be fetched from API in a real app
const mockProjects = [
  {
    id: 1,
    title: "AI-Powered Health Assistant",
    description: "Developing a mobile app that uses machine learning to provide personalized health recommendations.",
    owner: "Jane Smith",
    date: "Oct 15, 2023",
    category: "Mobile App",
    image: "https://via.placeholder.com/300x200?text=Health+App",
    status: "Open",
    skills: ["React Native", "Machine Learning", "UI/UX"],
  },
  {
    id: 2,
    title: "Sustainable Fashion Marketplace",
    description: "Creating an e-commerce platform for sustainable and ethical fashion brands.",
    owner: "Mark Johnson",
    date: "Sep 28, 2023",
    category: "Web Development",
    image: "https://via.placeholder.com/300x200?text=Fashion+Marketplace",
    status: "Open",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Educational VR Experience",
    description: "Building a virtual reality application for interactive learning experiences in science education.",
    owner: "Sarah Williams",
    date: "Oct 5, 2023",
    category: "VR/AR",
    image: "https://via.placeholder.com/300x200?text=VR+Education",
    status: "Open",
    skills: ["Unity", "3D Modeling", "C#"],
  },
  {
    id: 4,
    title: "Community Garden Management System",
    description: "Developing a system to help urban community gardens manage resources and volunteers.",
    owner: "David Chen",
    date: "Sep 10, 2023",
    category: "Web Development",
    image: "https://via.placeholder.com/300x200?text=Garden+Management",
    status: "In Progress",
    skills: ["JavaScript", "React", "Firebase"],
  },
  {
    id: 5,
    title: "Blockchain-based Voting System",
    description: "Creating a secure and transparent voting system using blockchain technology.",
    owner: "Michael Brown",
    date: "Aug 22, 2023",
    category: "Blockchain",
    image: "https://via.placeholder.com/300x200?text=Blockchain+Voting",
    status: "In Progress",
    skills: ["Solidity", "Ethereum", "Web3.js"],
  },
  {
    id: 6,
    title: "Accessibility Checker Browser Extension",
    description: "Building a browser extension that helps identify and fix accessibility issues on websites.",
    owner: "Lisa Garcia",
    date: "Oct 1, 2023",
    category: "Browser Extension",
    image: "https://via.placeholder.com/300x200?text=Accessibility+Tool",
    status: "Open",
    skills: ["JavaScript", "HTML/CSS", "Accessibility Standards"],
  },
]

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProjects(mockProjects)
      setFilteredProjects(mockProjects)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleFilterChange = (filters) => {
    let filtered = [...projects]

    if (filters.category) {
      filtered = filtered.filter((project) => project.category === filters.category)
    }

    if (filters.status) {
      filtered = filtered.filter((project) => project.status === filters.status)
    }

    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter((project) => filters.skills.some((skill) => project.skills.includes(skill)))
    }

    setFilteredProjects(filtered)
  }

  const handleSortChange = (order) => {
    const sorted = [...filteredProjects].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return order === "desc" ? dateB - dateA : dateA - dateB
    })

    setFilteredProjects(sorted)
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Explore Projects</h1>
        <Link to="/create-project" className="create-project-btn">
          <FaPlus /> Create Project
        </Link>
      </div>

      <FilterBar onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading projects...</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <div className="no-results">
              <p>No projects match your filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Projects

