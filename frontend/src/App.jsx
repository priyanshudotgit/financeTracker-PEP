// react
import { Routes, Route, Navigate } from 'react-router-dom'

// components
import Login from './views/pages/Login'
import SignUp from './views/pages/SignUp'
import Landing from './views/pages/Landing'
import Dashboard from './views/pages/Dashboard';
import Profile from './views/pages/Profile';
import ProtectedRoute from './views/layouts/ProtectedRoute'
import Navbar from './views/components/Navbar';

// context & providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// css
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* ROUTES AND COMPONENTS */}
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Protected Routes */}
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App