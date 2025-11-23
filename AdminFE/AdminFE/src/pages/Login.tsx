import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../api/api'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await auth.login({ username, password })
      // BE wraps response in ApiResponse.data
      const token = res.data?.data?.token || res.data?.data?.accessToken || res.data?.data
      if (!token) {
        throw new Error('Không nhận được token từ server')
      }
      localStorage.setItem('token', token)
      navigate('/admin')
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Đăng nhập thất bại')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Login</h2>
        {error && <div className="text-sm text-red-700 bg-red-50 p-2 rounded">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
