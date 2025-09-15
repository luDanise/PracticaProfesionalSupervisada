import React from 'react';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';

function LoginIndex() {
  const navigate = useNavigate();

  return (
    <button className="loginindex-btn" onClick={() => navigate('/customer-login')}>
      Iniciar Sesión
    </button>
  );
}

export default LoginIndex;