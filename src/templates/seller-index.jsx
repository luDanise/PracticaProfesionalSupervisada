import React, { useEffect, useState } from 'react';
import '../styles/stylestemplate.css';
import Navbar from '../components/navBar';
import Footer from '../components/footer';
import axios from 'axios';

const SellerIndex = () => {
  const sellerName = localStorage.getItem('seller_name');
  const sellerUser = localStorage.getItem('seller_user');
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    if (sellerUser) {
      axios.get(`http://localhost:8000/api/seller-queries/${sellerUser}/`)
        .then(res => setQueries(res.data.queries))
        .catch(err => console.error('Error al obtener consultas:', err));
    }
  }, [sellerUser]);

  return (
    <div>

      <Navbar />
      <div className="containersi">¡Hola, {sellerName}!</div>

      <div className="customerinfo">
        <div className="font">Clientes Asignados sin responder</div>
        <div className="customerinfoshow">
          {queries.length === 0 ? (
            <div className="no-queries">No hay consultas asignadas por el momento.</div>
          ) : (
            queries.map((query, index) => (
              <div key={index} className="query-card">
                <div className="query-content">
                  <div className="query-details">
                    <div><h2>Cliente: {query.first_name}</h2></div>
                    <div><strong>Consulta recibida el:</strong> {query.created_at}</div>
                    <div><strong>Motivo de consulta:</strong> {query.general_reason}</div>
                    <div><strong>Correo electrónico:</strong> {query.email}</div>
                    <div><strong>Contacto:</strong> {query.phone}</div>
                  </div>
                  <div className="query-action">
                    <span>Estado: </span>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => console.log(`Consulta ${index} marcada como revisada`)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div><Footer /></div>
      
    </div>
  );
};

export default SellerIndex;