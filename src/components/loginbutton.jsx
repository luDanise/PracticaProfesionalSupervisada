import React from 'react';
import '../styles/styles.css';

function LoginButton({ onClick }) {
  return (
    <button type="button" className="go-btn" onClick={onClick}>
      INGRESAR
    </button>
  );
}

export default LoginButton;