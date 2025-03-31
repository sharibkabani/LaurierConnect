import { Link } from "react-router-dom"
import { FaLightbulb, FaUsers, FaRocket } from "react-icons/fa"

// Use a placeholder hero image
const heroImagePlaceholder = "https://via.placeholder.com/800x500?text=Collaboration"

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Connect. Collaborate. Create.</h1>
          <p>Find the perfect team for your next big idea or join exciting projects that match your skills.</p>
          <div className="hero-buttons">
            <Link to="/projects" className="primary-button">
              Explore Projects
            </Link>
            <Link to="/collaborators" className="secondary-button">
              Find Collaborators
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImagePlaceholder || "/placeholder.svg"} alt="Collaboration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Laurier Connect?</h2>
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <FaLightbulb />
            </div>
            <h3>Showcase Your Projects</h3>
            <p>
              Present your work through engaging video reels and media portfolios to attract interest from potential
              collaborators.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Find Perfect Collaborators</h3>
            <p>
              Our AI-driven recommendations match you with projects and collaborators that align with your skills and
              interests.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaRocket />
            </div>
            <h3>Streamlined Team Building</h3>
            <p>Easily manage applications and build your dream team with our intuitive project management tools.</p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="projects-preview">
          {/* This would be populated with ProjectCard components in a real app */}
          <div className="project-preview-placeholder">
            <h3>AI-Powered Health Assistant</h3>
            <p>Looking for ML engineers and UI designers</p>
            <span className="status open">Open</span>
          </div>

          <div className="project-preview-placeholder">
            <h3>Sustainable Fashion Marketplace</h3>
            <p>Seeking full-stack developers and marketing specialists</p>
            <span className="status open">Open</span>
          </div>

          <div className="project-preview-placeholder">
            <h3>Educational VR Experience</h3>
            <p>Need 3D modelers and Unity developers</p>
            <span className="status open">Open</span>
          </div>
        </div>
        <div className="view-all-container">
          <Link to="/projects" className="view-all-link">
            View All Projects
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to bring your ideas to life?</h2>
          <p>Join our community of innovators, creators, and collaborators today.</p>
          <Link to="/register" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

