import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../auth';

export default function PrivateRoute({ children }) {
  const user = getAuth();
  if (!user) return <Navigate to="/signup" />;
  return children;
}
