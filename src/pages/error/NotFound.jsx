import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/error.css';

const NotFound = () => (
  <div className="error-page">
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que buscas no existe.</p>
    <Link to="/">Ir al inicio</Link>
  </div>
);

export default NotFound;
