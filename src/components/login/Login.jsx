import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ switchAuthHandler, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await login({ email, password });
      if (response.error) {
        setError('Inicio de sesión fallido, verifica tus credenciales');
      } else {
        setSuccess('Inicio de sesión exitoso! 😁');
        localStorage.setItem('User', JSON.stringify(response.data));
        onLoginSuccess();
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado, intente de nuevo');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Host Hotels</h1>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#9ca3af',
                fontSize: '1.5rem',
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        <p className="register-text">
          ¿No tienes cuenta?{' '}
          <span className="register-link" onClick={switchAuthHandler}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
