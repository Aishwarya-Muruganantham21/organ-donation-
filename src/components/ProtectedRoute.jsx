import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user component needs user restriction, but an admin tries to access user page
  if (!requireAdmin && isAdmin) {
    // Optionally redirect admin away from user registration pages
    // return <Navigate to="/admin" replace />; 
  }

  return children;
};
