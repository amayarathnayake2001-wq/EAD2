import axios from 'axios'

export const API_BASE = (import.meta?.env?.VITE_API_BASE || 'http://localhost:8080').replace(/\/$/, '')

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Accept': 'application/json' }
})

client.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  res => res,
  err => {
    const status = err?.response?.status
    const msg = err?.response?.data?.message || err?.response?.data?.error || err.message
    return Promise.reject(new Error(`${status || ''} ${msg}`.trim()))
  }
)

export const loginRequest = async ({ username, password }) => (await client.post('/api/auth/login', { username, password })).data
export const registerRequest = async ({ username, password }) => (await client.post('/api/auth/register', { username, password })).data
export const fetchAppointments = async () => (await client.get('/api/appointments')).data
export const createAppointment = async (payload) => (await client.post('/api/appointments', payload)).data
export const updateAppointment = async (id, payload) => (await client.put(`/api/appointments/${id}`, payload)).data
export const deleteAppointment = async (id) => (await client.delete(`/api/appointments/${id}`)).data
