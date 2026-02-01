import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const ITEMS_PER_PAGE = 5

export default function ViewAlerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filterCountry, setFilterCountry] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [updating, setUpdating] = useState(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  async function fetchAlerts(page = 1) {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({ page, limit: ITEMS_PER_PAGE })
      if (filterCountry) params.append('country', filterCountry)
      if (filterStatus) params.append('status', filterStatus)
      
      const res = await fetch(`${API}/alerts?${params}`)
      if (!res.ok) throw new Error('Failed to fetch alerts')
      const body = await res.json()
      setAlerts(body.data || [])
      setTotalItems(body.meta?.total || 0)
      setTotalPages(Math.ceil((body.meta?.total || 0) / ITEMS_PER_PAGE))
      setCurrentPage(page)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAlerts(1) }, [filterCountry, filterStatus])

  async function changeStatus(id, nextStatus) {
    setUpdating(id)
    try {
      const res = await fetch(`${API}/alerts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      })
      if (res.ok) fetchAlerts(currentPage)
      else throw new Error('Failed to update')
    } catch (err) {
      alert(err.message)
    } finally {
      setUpdating(null)
    }
  }

  async function remove(id) {
    if (!confirm('Are you sure you want to delete this alert?')) return
    setUpdating(id)
    try {
      const res = await fetch(`${API}/alerts/${id}`, { method: 'DELETE' })
      if (res.status === 204) fetchAlerts(currentPage)
      else throw new Error('Failed to delete')
    } catch (err) {
      alert(err.message)
    } finally {
      setUpdating(null)
    }
  }

  const getStatusClass = (status) => 'status-badge status-' + status.toLowerCase()
  const getNextStatus = (current) => ({ Active: 'Booked', Booked: 'Expired', Expired: 'Active' })[current]

  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="nav-brand">The Flying Panda</Link>
        <div className="nav-links">
          <Link to="/create" className="nav-link">Create Alert</Link>
          <Link to="/alerts" className="nav-link active">Track Alerts</Link>
        </div>
      </nav>

      <div className="page-header">
        <h1>Visa Slot Alerts</h1>
        <p className="header-subtitle">Manage and track visa slot alerts</p>
      </div>

      {error && <div className="alert-message error">{error}</div>}

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by country"
          value={filterCountry}
          onChange={e => setFilterCountry(e.target.value)}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Booked">Booked</option>
          <option value="Expired">Expired</option>
        </select>
        <span className="result-count">{totalItems} alert{totalItems !== 1 ? 's' : ''} found</span>
      </div>

      <div className="table-wrapper">
        {loading && <div className="loading-state">Loading...</div>}
        {!loading && alerts.length === 0 && (
          <div className="empty-state">
            <p>No alerts found.</p>
            <Link to="/create" className="btn-primary" style={{ marginTop: '12px', display: 'inline-block' }}>
              Create Alert
            </Link>
          </div>
        )}
        {!loading && alerts.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>City</th>
                <th>Visa Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(a => (
                <tr key={a._id}>
                  <td><strong>{a.country}</strong></td>
                  <td>{a.city}</td>
                  <td>{a.visaType}</td>
                  <td><span className={getStatusClass(a.status)}>{a.status}</span></td>
                  <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-action btn-secondary"
                      onClick={() => changeStatus(a._id, getNextStatus(a.status))}
                      disabled={updating === a._id}
                    >
                      {updating === a._id ? '...' : `→ ${getNextStatus(a.status)}`}
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => remove(a._id)}
                      disabled={updating === a._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => fetchAlerts(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            ← Previous
          </button>
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="pagination-btn"
            onClick={() => fetchAlerts(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            Next →
          </button>
        </div>
      )}

    </div>
  )
}
