"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle, FaLinkedin, FaGithub, FaUser, FaEnvelope, FaLock } from "react-icons/fa"

// Use a placeholder logo URL if you don't have the actual image
const logoPlaceholder = "https://via.placeholder.com/150x50?text=Laurier+Connect"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // In a real app, this would make an API call to register
    // For demo purposes, we'll just redirect to home
    navigate("/")
  }

  const handleSocialRegister = (provider) => {
    // In a real app, this would initiate OAuth flow
    console.log(`Registering with ${provider}`)
    navigate("/")
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <img src={logoPlaceholder || "/placeholder.svg"} alt="Laurier Connect Logo" className="auth-logo" />
          <h1>Create an Account</h1>
          <p>Join Laurier Connect to collaborate on projects</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <FaUser /> Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FaLock /> Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="auth-submit">
              Sign Up
            </button>
          </div>
        </form>

        <div className="social-login">
          <p>Or sign up with</p>
          <div className="social-buttons">
            <button className="social-button google" onClick={() => handleSocialRegister("Google")}>
              <FaGoogle /> Google
            </button>
            <button className="social-button linkedin" onClick={() => handleSocialRegister("LinkedIn")}>
              <FaLinkedin /> LinkedIn
            </button>
            <button className="social-button github" onClick={() => handleSocialRegister("GitHub")}>
              <FaGithub /> GitHub
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

