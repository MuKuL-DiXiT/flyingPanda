import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function CreateAlert() {
  const navigate = useNavigate()
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [visaType, setVisaType] = useState('Tourist')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: null, text: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage({ type: null, text: '' })
    
    if (!country.trim() || !city.trim()) {
      setMessage({ type: 'error', text: 'Country and city are required' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, city, visaType })
      })
      
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to create alert')
      }

      setMessage({ type: 'success', text: 'Alert created successfully! Redirecting...' })
      setTimeout(() => navigate('/alerts'), 1500)
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="nav-brand">The Flying Panda</Link>
        <div className="nav-links">
          <Link to="/create" className="nav-link active">Create Alert</Link>
          <Link to="/alerts" className="nav-link">Track Alerts</Link>
        </div>
      </nav>

      <div className="page-header">
        <h1>Create Alert</h1>
        <p className="header-subtitle">Set up a new visa slot alert</p>
      </div>

      {message.text && (
        <div className={`alert-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="card">
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              placeholder="United States"
              value={country}
              onChange={e => setCountry(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="New York"
              value={city}
              onChange={e => setCity(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="visaType">Visa Type</label>
            <select id="visaType" value={visaType} onChange={e => setVisaType(e.target.value)} disabled={loading}>
              <option value="Tourist">Tourist Visa</option>
              <option value="Business">Business Visa</option>
              <option value="Student">Student Visa</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Alert'}
          </button>
        </form>
      </div>

    </div>
  )
}
