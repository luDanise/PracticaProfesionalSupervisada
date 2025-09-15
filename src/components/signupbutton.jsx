import React from 'react';
import '../styles/styles.css';

function SignupButton({ onClick }) {
  return (
    <button className="go-btn" onClick={onClick}>
      REGISTRARSE
    </button>
  );
}

export default SignupButton;