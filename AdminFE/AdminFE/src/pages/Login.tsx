import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../api/api'
import './Login.css'

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
    <div className="login-page">
      <form className="login-form" onSubmit={submit}>
        <h2>Admin Login</h2>
        {error && <div className="error">{error}</div>}
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
