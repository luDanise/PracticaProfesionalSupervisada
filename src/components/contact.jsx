import React from 'react';
import '../styles/styles.css';
import iconas from '../images/assist.png'
import iconem from '../images/emergencia.png'

const Contact = () => {
  return (
    <div className="contact">
      
        <div className="contactinfo">
          <h2 className="sloganw">Comunicate con nosotros</h2>
          <p className="ci">Contactanos por el medio que te sea más cómodo. ¡Estamos a tu disposición!</p>
        </div>

        <div className="cardsc">
          <div className="cardc">
            <h2 className="serv">Asistencia al Socio</h2>
            <div className="as">
              <img src={iconas} alt="Icono Asistencia al Socio" className="plan-iconc" />
              <div className="numeros-as">
                <p>0800-122-7737</p>
                <p>011-4350-3900</p>
              </div>
            </div>
          </div>
          <div className="cardc">
            <h2 className="serv">Servicio de Emergencias y Urgencias</h2>
            <div className="as">
              <img src={iconem} alt="Icono Emergencia" className="plan-iconc" />
              <div className="numeros-as">
                <p>GBA y CABA: (011) 3754-7777</p>
                <p>La Plata: (0221) 453-1419 | 451-3145</p>
              </div>
            </div>
          </div>
        </div>
        
    </div>
  );
};

export default Contact;