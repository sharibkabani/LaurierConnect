"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle, FaLinkedin, FaGithub, FaEnvelope, FaLock } from "react-icons/fa"

// Use a placeholder logo URL if you don't have the actual image
const logoPlaceholder = "https://via.placeholder.com/150x50?text=Laurier+Connect"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll just redirect to home
    navigate("/")
  }

  const handleSocialLogin = (provider) => {
    // In a real app, this would initiate OAuth flow
    console.log(`Logging in with ${provider}`)
    navigate("/")
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <img src={logoPlaceholder || "/placeholder.svg"} alt="Laurier Connect Logo" className="auth-logo" />
          <h1>Welcome Back</h1>
          <p>Sign in to continue to Laurier Connect</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="auth-submit">
              Sign In
            </button>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
        </form>

        <div className="social-login">
          <p>Or sign in with</p>
          <div className="social-buttons">
            <button className="social-button google" onClick={() => handleSocialLogin("Google")}>
              <FaGoogle /> Google
            </button>
            <button className="social-button linkedin" onClick={() => handleSocialLogin("LinkedIn")}>
              <FaLinkedin /> LinkedIn
            </button>
            <button className="social-button github" onClick={() => handleSocialLogin("GitHub")}>
              <FaGithub /> GitHub
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

