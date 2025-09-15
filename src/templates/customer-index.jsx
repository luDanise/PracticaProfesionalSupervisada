import React, { useEffect, useState } from 'react';
import '../styles/stylestemplate.css';
import Footer from '../components/footer';
import logoapres from '../images/logoapres.png';
import users from '../images/users.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import change from '../images/cambioplan.png';
import consult from '../images/consulta.png';
import health from '../images/salud.jpg';
import iconPlan from '../images/form.png';
import iconDuda from '../images/duda.png';
import iconHome from '../images/homeicon.png';

const CustomerIndex = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('customer_name');
    localStorage.removeItem('customer_id');
    navigate('/customer-login');
  };

  useEffect(() => {
    const customerId = localStorage.getItem('customer_id');
    if (customerId) {
      axios.get(`http://localhost:8000/api/customer/${customerId}/`)
        .then(response => setCustomerData(response.data))
        .catch(error => console.error('Error al obtener datos del cliente:', error));
    }
  }, []);

  return (
    <div className="screen">

      <nav className="breadcrumbi-nav">
        <div className="breadcrumbi-segment small">
          <img src={logoapres} alt="Logo Apres" className="breadcrumb-logo" />
        </div>
        <div className="breadcrumbi-segment fill">
          <div className="breadcrumb-icon"></div>
          <div className="breadcrumb-fontc" onClick={handleLogout} style={{ cursor: 'pointer' }}>Cerrar sesión</div>
          <div className="breadcrumbi-segment small">
            <img src={users} alt="User" className="breadcrumb-icon" />
          </div>
        </div>
      </nav>

      <div className="containerci">
        {customerData && (
          <div className="user-info-box">
            <h3>Información Personal</h3>
            <div className="data">
              <div className="user-info-item"><strong>Nombre:</strong> {customerData.first_name}</div>
              <div className="user-info-item"><strong>Apellido:</strong> {customerData.last_name}</div>
              <div className="user-info-item"><strong>Fecha de Nacimiento:</strong> {customerData.birthDate}</div>
            </div>
            <div className="data">
              <div className="user-info-item"><strong>Provincia:</strong> {customerData.province}</div>
              <div className="user-info-item"><strong>Correo electrónico:</strong> {customerData.email}</div>
              <div className="user-info-item"><strong>Plan:</strong> Classic</div>
            </div>
          </div>
        )}
        <div className="cards">
          <div className="card">
            <div className="plan-change-box">
              <img src={iconPlan} alt="Icono cambio de plan" className="plan-icon" />
              <p className="plan-text">
                ¿Deseas cambiar de plan? <a href="/#services" className="plan-link">Haz click aquí para obtener más información.</a>
              </p>
            </div>
          <img src={change} alt="Change" className="photos" />
          </div>
          <div className="card">
            <div className="plan-change-box">
              <img src={iconDuda} alt="Icono dudas" className="plan-icon" />
              <p className="plan-text">
                ¿Tienes alguna duda? <a href="/#moreinfo" className="plan-link">Haz click aquí para enviar tu consulta.</a>
              </p>
            </div>
            <img src={consult} alt="Consult" className="photos" />
          </div>
          <div className="card">
            <div className="plan-change-box">
              <img src={iconHome} alt="Icono home" className="plan-icon" />
              <p className="plan-text">
                Para más información, <a href="/" className="plan-link">haz click aquí para ir a nuestro sitio web.</a>
              </p>
            </div>
            <img src={health} alt="Health" className="photos" />
          </div>
        </div>
        <Footer />
      </div>
      
    </div>
  );
};

export default CustomerIndex;