import './index.css'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './views/layouts/ProtectedRoute'
import Login from './views/pages/Login'
import Dashboard from './views/pages/Dashboard'

import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      {/* ROUTES AND COMPONENTS */}
      
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Routes */}
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
