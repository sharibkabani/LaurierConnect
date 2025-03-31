"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa"

// Use a placeholder logo URL if you don't have the actual image
const logoPlaceholder = "https://via.placeholder.com/150x50?text=Laurier+Connect"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would be managed by auth context in a real app
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogin = () => {
    // This would be replaced with actual auth logic
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    // This would be replaced with actual auth logic
    setIsLoggedIn(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-container">
          <img src={logoPlaceholder || "/placeholder.svg"} alt="Laurier Connect Logo" className="logo" />
        </Link>

        <div className="search-container">
          <input type="text" placeholder="Search projects, collaborators..." className="search-input" />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/collaborators" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Collaborators
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/applications" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Applications
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile/me" className="nav-link profile-link" onClick={() => setIsMenuOpen(false)}>
                  <FaUser /> Profile
                </Link>
              </li>
              <li className="nav-item">
                <button className="auth-button logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="auth-button login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="auth-button register" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

