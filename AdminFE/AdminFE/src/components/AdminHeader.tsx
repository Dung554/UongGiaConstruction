import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader: React.FC = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid #ddd' }}>
      <div style={{ fontWeight: 700 }}>Admin Dashboard</div>
      <div>
        <button onClick={() => navigate('/admin')} style={{ marginRight: 8 }}>Home</button>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  )
}

export default AdminHeader
