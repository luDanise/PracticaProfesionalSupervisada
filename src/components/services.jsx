import React from 'react';
import '../styles/styles.css';

const Services = () => {
  return (
    <div>

      <div className="services">
        <div className="contactinfo">
          <h2 className="sloganw">Planes que te entienden.</h2>
          <p className="ci">
            Encontrá la opción perfecta para vos, con la calidad médica y de servicio que mereces.
          </p>
        </div>
      </div>

      <div className="centers">
        <div className="global-banner">
          <div className="global-title">
            <h3 className="centertitle">Apres Global</h3>
            <div className="region-pill">CABA, GBA y La Plata</div>
          </div>
          <p className="subtitle">Conocé nuestros planes con la más amplia cobertura.</p>
        </div>
        <div className="cardsh">
          <div className="cardser">
           <h3 className="cardser-title">Global CLASSIC</h3>
           <h3 className="cardser-subtitle">Incluye:</h3>
            <ul className="cardser-benefits">
              <li>Consultas médicas generales.</li>
              <li>Emergencias domiciliarias sin cargo.</li>
              <li>Medicamentos con descuento del 40%.</li>
              <li>Odontología general sin cargo.</li>
              <li>Anteojos standard, 1 por año.</li>
            </ul>
            <div className="cardser-buttons">
              <button className="btnser-cotizar">Cotizar</button>
              <a className="btn-info" href="/pdfs/globalclassic.pdf" target="_blank" rel="noopener noreferrer">
                <button className="nonebutton">Conocer más</button>
              </a>
            </div>
          </div>
          <div className="cardser">
            <h3 className="cardser-title">Global PLUS</h3>
           <h3 className="cardser-subtitle">Incluye Global Classic y además:</h3>
            <ul className="cardser-benefits">
              <li>Más sesiones de Kinesiología y Fonoaudiología incluidas por año.</li>
              <li>Más sesiones de Psicología, Psiquiatría y Psicopedagogía incluidas con copago por año.</li>
              <li>Lentes de contacto, 1 por año.</li>
              <li>Reintegros en consultas fuera de la cartilla.</li>
            </ul>
            <div className="cardser-buttons">
              <button className="btnser-cotizar">Cotizar</button>
              <a className="btn-info" href="/pdfs/globalplus.pdf" target="_blank" rel="noopener noreferrer">
                <button className="nonebutton">Conocer más</button>
              </a>
            </div>
          </div>
          <div className="cardser">
            <h3 className="cardser-title">Global PREMIUM</h3>
           <h3 className="cardser-subtitle">Incluye Global Plus y además:</h3>
            <ul className="cardser-benefits">
              <li>Consulta domiciliaria sin cargo.</li>
              <li>Kinesiología y Fonoaudiología, sin tope, sin cargo.</li>
              <li>Implantes dentales, 1 por año.</li>
              <li>Antireflex incluido para anteojos.</li>
              <li>Más sesiones de Psicología, Psiquiatría y Psicopedagogía incluidas con copago por año.</li>
            </ul>
            <div className="cardser-buttons">
              <button className="btnser-cotizar">Cotizar</button>
              <a className="btn-info" href="/pdfs/globalpremium.pdf" target="_blank" rel="noopener noreferrer">
                <button className="nonebutton">Conocer más</button>
              </a>
            </div>
          </div>
        </div>

        <div className="global-banner">
          <div className="global-title">
            <h3 className="centertitle">Apres Regional</h3>
            <div className="region-pill">GBA y La Plata</div>
          </div>
          <p className="subtitle">Conocé nuestros planes regionales.</p>
        </div>

        <div className="cardsh">
          <div className="cardser">
            <h3 className="cardser-title">Regional CLASSIC</h3>
            <h3 className="cardser-subtitle">Incluye:</h3>
            <ul className="cardser-benefits">
              <li>Consultas en consultorio sin tope / sin cargo.</li>
              <li>Emergencias Médicas las 24 horas.</li>
              <li>Medicamentos con descuento del 40%.</li>
              <li>Anteojos standard, 1 por año.</li>
              <li>Prácticas diagnósticas de baja y media complejidad, sin tope, sin cargo.</li>
            </ul>
            <div className="cardser-buttons">
              <button className="btnser-cotizar">Cotizar</button>
              <a className="btn-info" href="/pdfs/regionalclassic.pdf" target="_blank" rel="noopener noreferrer">
                <button className="nonebutton">Conocer más</button>
              </a>
            </div>
          </div>
          <div className="cardser">
            <h3 className="cardser-title">Regional PLUS</h3>
            <h3 className="cardser-subtitle">Incluye Regional Classic y además:</h3>
            <ul className="cardser-benefits">
              <li>Más sesiones de Kinesiologia, Fonoaudiologia y Salud Mental incluidas por año.</li>
              <li>Reintegro en consultas fuera de la cartilla, con tope.</li>
              <li>Mayor cantidad de profesionales con Cartilla “A”.</li>
            </ul>
            <div className="cardser-buttons">
              <button className="btnser-cotizar">Cotizar</button>
              <a className="btn-info" href="/pdfs/regionalplus.pdf" target="_blank" rel="noopener noreferrer">
                <button className="nonebutton">Conocer más</button>
              </a>
            </div>
          </div>
          <div className="cardser">
            <h3 className="cardser-title">Regional PREMIUM</h3>
            <h3 className="cardser-subtitle">Incluye Regional Plus y además:</h3>
            <ul className="cardser-benefits">
              <li>Más sesiones de Kinesiologia, Fonoaudiologia y Salud Mental incluidas por año.</li>
              <li>Consulta domiciliaria sin cargo.</li>
              <li>Habitación individual en Sanatorio Modelo Quilmes (No válido en otros centros de internación).</li>
            </ul>
            <div className="cardser-buttons">
              <button className="btnser-cotizar">Cotizar</button>
              <a className="btn-info" href="/pdfs/regionalpremium.pdf" target="_blank" rel="noopener noreferrer">
                <button className="nonebutton">Conocer más</button>
              </a>
            </div>
          </div>
        </div>

        <div className="cardsh">
          <div className="cardser">
            <h3 className="cardser-title">Regional VOLUNTARIO A</h3>
            <h3 className="cardser-subtitle">Plan voluntario, que incluye:</h3>
            <ul className="cardser-benefits">
              <li>Consultas en consultorio sin tope / sin cargo.</li>
              <li>Emergencias Médicas las 24 horas.</li>
              <li>Medicamentos con descuento del 40%.</li>
              <li>Anteojos al 50%, 1 por año.</li>
              <li>Prácticas diagnósticas de baja y media complejidad, sin tope, sin cargo.</li>
            </ul>
            <div className="cardser-buttons">
              <button className="btnser-cotizar">Cotizar</button>
              <a className="btn-info" href="/pdfs/regionala.pdf" target="_blank" rel="noopener noreferrer">
                <button className="nonebutton">Conocer más</button>
              </a>
            </div>
          </div>
          <div className="cardser">
            <h3 className="cardser-title">Regional VOLUNTARIO RS</h3>
            <h3 className="cardser-subtitle">Incluye Regional Voluntario A y además:</h3>
            <ul className="cardser-benefits">
              <li>Más sesiones de Kinesiologia, Fonoaudiologia y Salud Mental incluidas por año.</li>
              <li>Reintegro en consultas fuera de la cartilla, con tope.</li>
              <li>Cobertura en el resto del mundo (Asistencia al viajero), con mayor descuento.</li>
            </ul>
            <div className="cardser-buttons">
              <button className="btnser-cotizar">Cotizar</button>
              <a className="btn-info" href="/pdfs/regionalrs.pdf" target="_blank" rel="noopener noreferrer">
                <button className="nonebutton">Conocer más</button>
              </a>
            </div>
          </div>
          <div className="cardser">
            <h3 className="cardser-title">Regional VOLUNTARIO T</h3>
            <h3 className="cardser-subtitle">Incluye Regional Voluntario RS y además:</h3>
            <ul className="cardser-benefits">
              <li>Más sesiones de Kinesiologia, Fonoaudiologia y Salud Mental incluidas por año.</li>
              <li>Anteojos standard, 1 por año.</li>
              <li>Cobertura en el resto del mundo (Asistencia al viajero) sin cargo.</li>
            </ul>
            <div className="cardser-buttons">
              <button className="btnser-cotizar">Cotizar</button>
              <a className="btn-info" href="/pdfs/regionalt.pdf" target="_blank" rel="noopener noreferrer">
                <button className="nonebutton">Conocer más</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <h3 className="centertitle">
        Planes Corporativos para tu <span className="highlight">empresa.</span>
      </h3>
      <div className="corp">
        <div className="corp-text">
          <div className="border">Apres para Empresas</div>
          <p className="corp-title">Más que un servicio de salud, una solución para tu empresa.</p>
          <p className="corp-desc">Conocé los beneficios y servicios que tenemos para tu empresa.</p>
          <button className="cotizar-btn">Cotizá ahora</button>
        </div>
      </div>

    </div>
  );
};

export default Services;