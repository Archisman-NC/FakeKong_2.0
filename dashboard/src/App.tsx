import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from './components/DashboardLayout'
import Overview from './pages/Overview'
import ApiManagement from './pages/ApiManagement'

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [user, setUser] = useState<any>(null)
  
  const handleLogin = (newToken: string, userData: any) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('selectedOrgId')
    setToken(null)
    setUser(null)
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      
      <Route 
        path="/" 
        element={token ? <DashboardLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
      >
        <Route index element={<Overview />} />
        <Route path="apis" element={<ApiManagement />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
