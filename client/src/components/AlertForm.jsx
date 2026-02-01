import React, { useState } from 'react'

export default function AlertForm({ onCreate, apiBase }) {
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
      const res = await fetch(`${apiBase}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, city, visaType })
      })
      
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Failed to create alert')
      }

      setCountry('')
      setCity('')
      setVisaType('Tourist')
      setMessage({ type: 'success', text: 'Alert created successfully!' })
      setTimeout(() => setMessage({ type: null, text: '' }), 3000)
      onCreate()
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
          disabled={loading}
        />
        <select value={visaType} onChange={e => setVisaType(e.target.value)} disabled={loading}>
          <option value="Tourist">Tourist Visa</option>
          <option value="Business">Business Visa</option>
          <option value="Student">Student Visa</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : '+ Create Alert'}
        </button>
      </form>
      {message.text && (
        <div
          style={{
            background: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            borderLeft: `4px solid ${message.type === 'success' ? '#00b894' : '#d63031'}`
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}