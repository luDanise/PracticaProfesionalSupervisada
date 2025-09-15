import '../styles/styles.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoapres from '../images/logoapres.png';
import home from '../images/home.png';
import icon from '../images/icon.png';
import users from '../images/users.png';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('seller_name');
    localStorage.removeItem('seller_id');
    navigate('/seller-login');
  };

  return (
    <nav className="breadcrumb-nav">

      <div className="breadcrumb-segment small first">
        <img src={logoapres} alt="Logo Apres" className="breadcrumb-logo" />
      </div>

      <div className="breadcrumb-segment small">
        <img src={home} alt="Home" className="breadcrumb-icons" />
      </div>

      <div className="breadcrumb-segment fill">
        <div className="breadcrumb-font">
          Admin / Inicio
        </div>
      </div>

      <div className="breadcrumb-segment small">
        <img src={icon} alt="Icon" className="breadcrumb-icons" />
      </div>
      
      <div className="breadcrumb-segment fill last">
        <div className="breadcrumb-icon"></div>
        <div className="breadcrumb-fontc" onClick={handleLogout} style={{ cursor: 'pointer' }}>Cerrar sesión</div>
        <div className="breadcrumb-segment small last">
          <img src={users} alt="User" className="breadcrumb-icon" />
        </div>
      </div>

    </nav>
  );
}

export default Navbar;