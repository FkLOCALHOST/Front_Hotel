import React, { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import "../../assets/styles/auth/login.css";

const login = async ({ email, password }) => {
   try {
      const response = await login({ email, password });
      if (response.error) {
        setError('Inicio de sesión fallido. Verifica tus credenciales.');
      } else {
        setSuccess('¡Inicio de sesión exitoso!');
        localStorage.setItem('Trabajador', JSON.stringify(response.data));
        onLoginSuccess(); 
        }
    }catch(err) {
      setError('Ocurrió un error inesperado. Intenta de nuevo.');
    }
};

const Login = ({ onLoginSuccess }) => {
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
        setError('Inicio de sesión fallido. Verifica tus credenciales.');
      } else {
        setSuccess('¡Inicio de sesión exitoso!');
        localStorage.setItem('Trabajador', JSON.stringify(response.data));
        if (onLoginSuccess) onLoginSuccess();
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Intenta de nuevo.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>LocalHotel</h1>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button type="submit">
            Iniciar Sesión
          </button>
          <p>
            ¿No tienes cuenta?{" "}
            <span>
              Regístrate
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;