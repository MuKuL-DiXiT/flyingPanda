import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="nav-brand">The Flying Panda</Link>
        <div className="nav-links">
          <Link to="/create" className="nav-link">Create Alert</Link>
          <Link to="/alerts" className="nav-link">Track Alerts</Link>
        </div>
      </nav>

      <div className="hero">
        <h1 className="hero-title">Visa Slot Alerts</h1>
        <p className="hero-subtitle">Internal tracking dashboard</p>
        <p className="hero-description">
          Track visa appointment availability across multiple countries and cities.
          Get notified when slots open up for Tourist, Business, or Student visas.
        </p>
        <div className="hero-actions">
          <Link to="/create" className="btn-primary btn-large">Create Alert</Link>
          <Link to="/alerts" className="btn-secondary-outline btn-large">Track All Alerts</Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Multi-Country Support</h3>
          <p>Track visa slots across multiple countries and cities</p>
        </div>
        <div className="feature-card">
          <h3>Status Tracking</h3>
          <p>Monitor Active, Booked, and Expired alerts</p>
        </div>
        <div className="feature-card">
          <h3>Real-time Updates</h3>
          <p>Instantly update and manage your alerts</p>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Backend Architecture</h4>
            <p>Built with Node.js and Express.js for robust server-side processing. MongoDB provides flexible document storage with Mongoose ODM for data modeling and validation.</p>
          </div>
          <div className="footer-section">
            <h4>Core Features</h4>
            <ul>
              <li>RESTful API with CRUD operations</li>
              <li>Server-side pagination for performance</li>
              <li>Real-time filtering and search</li>
              <li>Data validation and error handling</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Technology Stack</h4>
            <ul>
              <li>Frontend: React 18 with Vite bundler</li>
              <li>Backend: Express.js with MongoDB</li>
              <li>Styling: CSS custom properties</li>
              <li>Routing: React Router DOM</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 The Flying Panda • Minimal Dark Theme • Internal Dashboard</p>
        </div>
      </footer>
    </div>
  )
}
