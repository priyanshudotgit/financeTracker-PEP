// react
import { Routes, Route, Navigate } from 'react-router-dom'

// components
import Login from './views/pages/Login'
import ProtectedRoute from './views/layouts/ProtectedRoute'
import Dashboard from './views/pages/Dashboard';

// misc
import { AuthProvider } from './context/AuthContext';

// css
import './index.css'

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
  );
}

export default App