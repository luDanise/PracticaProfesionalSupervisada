import React from 'react';
import '../styles/styles.css';
import { useNavigate, useLocation } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const currentPath = location.pathname;

    if (currentPath === '/seller-login') {
      navigate('/customer-login');
    } else if (currentPath === '/customer-login') {
      navigate('/');
    } else if (currentPath === '/customer-signup') {
      navigate('/customer-login');
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="back-btn" onClick={handleBack}>
      Volver
    </button>
  );
}

export default BackButton;