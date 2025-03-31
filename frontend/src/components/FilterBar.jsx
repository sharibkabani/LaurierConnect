"use client"

import { useState } from "react"
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"

const FilterBar = ({ onFilterChange, onSortChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState("desc")
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    skills: [],
  })

  const categories = ["Web Development", "Mobile App", "Data Science", "UI/UX Design", "Research", "Other"]
  const statuses = ["Open", "In Progress", "Completed"]
  const skillsList = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "UI/UX",
    "Data Analysis",
    "Machine Learning",
    "Mobile Development",
  ]

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const toggleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc"
    setSortOrder(newOrder)
    onSortChange(newOrder)
  }

  const handleCategoryChange = (e) => {
    const newFilters = { ...filters, category: e.target.value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleStatusChange = (e) => {
    const newFilters = { ...filters, status: e.target.value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSkillToggle = (skill) => {
    let updatedSkills
    if (filters.skills.includes(skill)) {
      updatedSkills = filters.skills.filter((s) => s !== skill)
    } else {
      updatedSkills = [...filters.skills, skill]
    }

    const newFilters = { ...filters, skills: updatedSkills }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const resetFilters = {
      category: "",
      status: "",
      skills: [],
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <button className="filter-toggle" onClick={toggleFilter}>
          <FaFilter /> Filters
        </button>
        <button className="sort-toggle" onClick={toggleSort}>
          {sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
          Sort
        </button>
      </div>

      {isFilterOpen && (
        <div className="filter-dropdown">
          <div className="filter-section">
            <h4>Category</h4>
            <select value={filters.category} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h4>Status</h4>
            <select value={filters.status} onChange={handleStatusChange}>
              <option value="">All Statuses</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h4>Skills</h4>
            <div className="skills-filter">
              {skillsList.map((skill, index) => (
                <div key={index} className="skill-checkbox">
                  <input
                    type="checkbox"
                    id={`skill-${index}`}
                    checked={filters.skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                  />
                  <label htmlFor={`skill-${index}`}>{skill}</label>
                </div>
              ))}
            </div>
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default FilterBar

