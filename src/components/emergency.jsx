import React from 'react';
import '../styles/styles.css';
import iconur from '../images/urgencyicon.png'

const Emergency = () => {
  return (
    <div className="emergency">

      <div className="emergencyblock">
        <div>
          <img src={iconur} alt="Icono Urgencia" className="iconur" />
          <h2 className="urg">Servicio de Emergencias y Urgencias.</h2>
          <p>Las 24 horas, los 365 días del año.</p>
        </div>
        <div>
          <div className="urgencyservices">
            <strong>GBA y CABA</strong>
            (011) 3754-7777
          </div>
          <div className="urgencyservices">
            <strong>La Plata</strong>
            (0221) 453-1419<br />
            (0221) 451-3145
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Emergency;