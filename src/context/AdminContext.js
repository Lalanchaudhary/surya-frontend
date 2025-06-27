import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdminLogin()
  }, [])

  const checkAdminLogin = async () => {
    try {
      const res = await axios.get('http://localhost:9000/auth/verify', {
        withCredentials: true
      })
      setAdmin(res.data.admin)
    } catch (err) {
      setAdmin(null)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await axios.post('http://localhost:9000/auth/logout', {}, {
        withCredentials: true
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setAdmin(null)
      // Clear any localStorage items
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
    }
  }

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:9000/auth/login', credentials, {
        withCredentials: true
      })
      setAdmin(response.data.admin)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' }
    }
  }

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, logout, login, checkAdminLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
