import React from 'react';
import '../styles/styles.css';
import login from '../images/login.png';
import { useNavigate } from 'react-router-dom';

function SellerLoginButton() {
  const navigate = useNavigate();

  return (
    <button className="sellerlogin-btn" onClick={() => navigate('/seller-login')}>
      <img src={login} alt="Login" className="login-icon" />
      Iniciar Sesión como Vendedor
    </button>
  );
}

export default SellerLoginButton;
