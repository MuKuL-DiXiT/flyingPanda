import React, { useState } from 'react'

export default function AlertList({ alerts, onUpdate, onDelete, apiBase, loading }) {
  const [filterCountry, setFilterCountry] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [updating, setUpdating] = useState(null)

  async function changeStatus(id, nextStatus) {
    setUpdating(id)
    try {
      const res = await fetch(`${apiBase}/alerts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      })
      if (res.ok) onUpdate()
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
      const res = await fetch(`${apiBase}/alerts/${id}`, { method: 'DELETE' })
      if (res.status === 204) onDelete()
      else throw new Error('Failed to delete')
    } catch (err) {
      alert(err.message)
    } finally {
      setUpdating(null)
    }
  }

  const filtered = alerts.filter(a => {
    return (!filterCountry || a.country.toLowerCase().includes(filterCountry.toLowerCase())) &&
           (!filterStatus || a.status === filterStatus)
  })

  const getStatusClass = (status) => {
    const base = 'status-badge status-'
    return base + status.toLowerCase()
  }

  const getNextStatuses = (current) => {
    const statuses = { Active: 'Booked', Booked: 'Expired', Expired: 'Active' }
    const next = statuses[current]
    return next
  }

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Filter by country"
          value={filterCountry}
          onChange={e => setFilterCountry(e.target.value)}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Booked">Booked</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      <div className="table-wrapper">
        {loading && <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>Loading...</div>}
        {!loading && filtered.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📋</div>
            <p>No alerts found. Create your first visa alert above!</p>
          </div>
        )}
        {!loading && filtered.length > 0 && (
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
              {filtered.map(a => (
                <tr key={a._id}>
                  <td><strong>{a.country}</strong></td>
                  <td>{a.city}</td>
                  <td>{a.visaType}</td>
                  <td><span className={getStatusClass(a.status)}>{a.status}</span></td>
                  <td>{new Date(a.createdAt).toLocaleDateString()} {new Date(a.createdAt).toLocaleTimeString()}</td>
                  <td style={{ minWidth: '180px' }}>
                    <button
                      className="btn-action btn-secondary"
                      onClick={() => changeStatus(a._id, getNextStatuses(a.status))}
                      disabled={updating === a._id}
                    >
                      {updating === a._id ? '...' : `→ ${getNextStatuses(a.status)}`}
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
    </div>
  )
}