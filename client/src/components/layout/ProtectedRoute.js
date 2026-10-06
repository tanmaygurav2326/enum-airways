import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullPage text="Authenticating..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    if (requiredRole === 'Admin' && user?.role !== 'Admin') {
      return <Navigate to="/" replace />;
    }
    if (requiredRole === 'Staff' && user?.role !== 'Staff' && user?.role !== 'Admin') {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
