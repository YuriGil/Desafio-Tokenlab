import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;