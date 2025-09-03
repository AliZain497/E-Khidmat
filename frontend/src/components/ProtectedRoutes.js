// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin'); // simple check (replace with real auth)
  return isAdmin ? children : <Navigate to="/" />;
}
