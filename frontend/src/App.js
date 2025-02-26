import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Calendar from './pages/Calendar';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Rota para a página inicial (protegida) */}
          <Route
            index
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />

          {/* Rota para login */}
          <Route path="/login" element={<Login />} />

          {/* Rota para registro */}
          <Route path="/register" element={<Register />} />

          {/* Rota para o calendário (protegida) */}
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;