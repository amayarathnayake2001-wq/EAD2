import React, { createContext, useContext, useMemo, useState } from 'react'
import { loginRequest, registerRequest } from '../services/api.js'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('jwt') || '')
  const [role, setRole] = useState(() => localStorage.getItem('role') || '')
  const [user, setUser] = useState(() => ({ username: localStorage.getItem('username') || '' }))

  const login = async (username, password) => {
    const res = await loginRequest({ username, password })
    if (res?.token) {
      setToken(res.token)
      setRole(res.role || '')
      setUser({ username })
      localStorage.setItem('jwt', res.token)
      localStorage.setItem('role', res.role || '')
      localStorage.setItem('username', username)
    }
    return res
  }

  const register = async (username, password) => await registerRequest({ username, password })

  const logout = () => {
    setToken(''); setRole(''); setUser({ username: '' })
    localStorage.removeItem('jwt'); localStorage.removeItem('role'); localStorage.removeItem('username')
  }

  const value = useMemo(() => ({ token, role, user, login, register, logout }), [token, role, user])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
