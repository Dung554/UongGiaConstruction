import axios from 'axios'
import environment from '../config/environment'

const api = axios.create({
  baseURL: environment.apiUrl,
  headers: { 'Content-Type': 'application/json' },
})

// Attach token when present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export const auth = {
  login: (payload: { username: string; password: string }) =>
    api.post('/api/auth/login', payload),
}

export const users = {
  list: () => api.get('/api/users'),
}

export const projects = {
  list: () => api.get('/api/projects'),
}

export const supports = {
  list: () => api.get('/api/supports'),
}

export default api
