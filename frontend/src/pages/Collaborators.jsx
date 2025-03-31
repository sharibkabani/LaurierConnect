"use client"

import { useState, useEffect } from "react"
import CollaboratorCard from "../components/CollaboratorCard.jsx"
import FilterBar from "../components/FilterBar.jsx"

// Mock data - would be fetched from API in a real app
const mockCollaborators = [
  {
    id: 101,
    name: "Jane Smith",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB", "UI/UX"],
    rating: 4.8,
    education: "Computer Science, Laurier University",
    location: "Waterloo, ON",
    image: "https://via.placeholder.com/150x150?text=JS",
  },
  {
    id: 102,
    name: "Alex Johnson",
    title: "Machine Learning Engineer",
    skills: ["Python", "TensorFlow", "Data Analysis", "Computer Vision"],
    rating: 4.9,
    education: "AI & Robotics, Laurier University",
    location: "Toronto, ON",
    image: "https://via.placeholder.com/150x150?text=AJ",
  },
  {
    id: 103,
    name: "Michael Brown",
    title: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    rating: 4.7,
    education: "Design, Laurier University",
    location: "Kitchener, ON",
    image: "https://via.placeholder.com/150x150?text=MB",
  },
  {
    id: 104,
    name: "Sarah Williams",
    title: "Mobile Developer",
    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
    rating: 4.6,
    education: "Software Engineering, Laurier University",
    location: "Waterloo, ON",
    image: "https://via.placeholder.com/150x150?text=SW",
  },
  {
    id: 105,
    name: "David Chen",
    title: "Data Scientist",
    skills: ["Python", "R", "Machine Learning", "Statistical Analysis"],
    rating: 4.9,
    education: "Data Science, Laurier University",
    location: "Toronto, ON",
    image: "https://via.placeholder.com/150x150?text=DC",
  },
  {
    id: 106,
    name: "Lisa Garcia",
    title: "Backend Developer",
    skills: ["Node.js", "Python", "AWS", "Database Design"],
    rating: 4.8,
    education: "Computer Engineering, Laurier University",
    location: "Waterloo, ON",
    image: "https://via.placeholder.com/150x150?text=LG",
  },
]

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState([])
  const [filteredCollaborators, setFilteredCollaborators] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCollaborators(mockCollaborators)
      setFilteredCollaborators(mockCollaborators)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleFilterChange = (filters) => {
    let filtered = [...collaborators]

    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter((collaborator) => filters.skills.some((skill) => collaborator.skills.includes(skill)))
    }

    setFilteredCollaborators(filtered)
  }

  const handleSortChange = (order) => {
    const sorted = [...filteredCollaborators].sort((a, b) => {
      return order === "desc" ? b.rating - a.rating : a.rating - b.rating
    })

    setFilteredCollaborators(sorted)
  }

  return (
    <div className="collaborators-page">
      <div className="page-header">
        <h1>Find Collaborators</h1>
      </div>

      <FilterBar onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading collaborators...</p>
        </div>
      ) : (
        <div className="collaborators-grid">
          {filteredCollaborators.length > 0 ? (
            filteredCollaborators.map((collaborator) => (
              <CollaboratorCard key={collaborator.id} collaborator={collaborator} />
            ))
          ) : (
            <div className="no-results">
              <p>No collaborators match your filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Collaborators

