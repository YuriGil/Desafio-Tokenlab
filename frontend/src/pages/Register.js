import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Adicionando estado para o erro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos'); // Validação de campos vazios
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/'); // Redireciona para a página inicial após o registro
    } catch (err) {
      setError(err.response?.data?.msg || 'Erro ao registrar'); // Exibe mensagem de erro
    }
  };

  return (
    <div className="container">
      <h1>Registrar</h1>
      {error && <div className="alert alert-danger">{error}</div>} {/* Exibe o erro, se houver */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuário</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Register;