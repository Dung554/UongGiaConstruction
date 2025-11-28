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

export const authApi = {
  login: (payload: { username: string; password: string }) => api.post('/api/auth/login', payload),
  register: (payload: { username: string; password: string }) => api.post('/api/auth/register', payload),
}

export const typicalProject = {
  getAll: () => api.get('/api/typicalProject/getAll'),
  getById: (id: number | string) => api.get(`/api/typicalProject/getById/${id}`),
  create: (form: FormData) => api.post('/api/typicalProject/create', form, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: number | string, form: FormData) => api.put(`/api/typicalProject/update/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: number | string) => api.delete(`/api/typicalProject/delete/${id}`),
}

export const userConsultation = {
  create: (payload: object) => api.post('/api/userConsultation/create', payload),
  getAllConsultations: () => api.get('/api/userConsultation/getAllConsultations'),
  getAllStatus: () => api.get('/api/userConsultation/getAllStatus'),
  updateStatus: (id: number | string, payload: object) => api.put(`/api/userConsultation/updateStatus/${id}`, payload),
}

export default api
