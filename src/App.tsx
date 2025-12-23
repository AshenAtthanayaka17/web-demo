import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ProtectedRoute } from './components/ProtectedRoute';
export function App() {
  return <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute>
                <HomePage />
              </ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>;
}