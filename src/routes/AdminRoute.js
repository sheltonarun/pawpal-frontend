import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../auth';

export default function AdminRoute({ children }) {
  const user = getAuth();
  if (!user) return <Navigate to="/signup" />;
  if (user.role !== 'admin') return <Navigate to="/" />;
  return children;
}
