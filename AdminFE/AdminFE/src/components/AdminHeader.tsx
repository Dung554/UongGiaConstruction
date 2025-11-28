import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader: React.FC = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">Admin Dashboard</div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/admin')} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Home</button>
          <button onClick={logout} className="px-3 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100">Logout</button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
