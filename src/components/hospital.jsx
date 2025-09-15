import React, { useState } from 'react';
import '../styles/styles.css';

const Hospital = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const zonas = [
    {
      nombre: "CABA",
      sanatorios: [
        "CEMIC",
        "Clínica Bazterrica",
        "Instituto Quirúrgico Callao",
        "ICBA (Inst. Cardiovascular de Bs. As.)",
        "Clínica Santa Isabel",
        "Fundación Hospitalaria",
        "Fundación Favaloro",
        "Sanatorio Mater Dei",
        "Sanatorio Anchorena",
        "Clínica La Sagrada Familia",
        "Hospital Alemán",
        "IADT (Instituto Argentino de Diagnóstico y Tratamiento)"
      ]
    },
    {
      nombre: "Zona Norte",
      sanatorios: [
        "Sanatorio San Lucas",
        "Sanatorio Vicente López",
        "Sanatorio San Pablo"
      ]
    },
    {
      nombre: "Zona Noroeste",
      sanatorios: [
        "Corporación Médica San Martín",
        "Sanatorio Anchorena",
        "Sanatorio General Sarmiento"
      ]
    },
    {
      nombre: "Zona Oeste",
      sanatorios: [
        "San Juan de Dios",
        "Sanatorio Modelo De Morón",
        "Sanatorio San Mauricio"
      ]
    },
    {
      nombre: "Zona Sur",
      sanatorios: [
        "Sanatorio Modelo de Adrogué",
        "Sanatorio Modelo de Quilmes",
        "Sanatorio Itoiz",
        "Clínica IMA",
        "Clínica Monte Grande",
        "Clínica Espora"
      ]
    },
    {
      nombre: "Zona La Plata",
      sanatorios: [
        "Instituto Médico Platense",
        "Hospital Italiano",
        "Hospital Español",
        "IPENSA",
        "Clínica Santa Lucía",
        "Instituto Del Diagnóstico",
        "Clínica Oftalmológica Meroni",
        "Instituto Central De Medicina",
        "Sanatorio Argentino AMP (Agremiación Médica Platense)"
      ]
    }
  ];

  return (
    <div>

      <div className="hospital">
        <div className="contactinfo">
          <h2 className="sloganw">Recibí la atención que necesitás</h2>
          <p className="ci">
            Nuestros centros médicos cuentan con profesionales altamente calificados y tecnología de
            punta para brindarte una experiencia de salud integral.
          </p>
        </div>
      </div>

      <div className="centers">
        <h3 className="centertitle">
          Centros médicos Apres <span className="highlight">exclusivos.</span>
        </h3>

        <div className="cardsh">
          <div className="cardh">
            <h2 className="centertitles">Centro Médico Avellaneda</h2>
            <div className="centerdata">
              <p>French 37, Avellaneda</p>
              <p><b>Tel:</b> 4201-1168 / 6708</p>
              <p><b>Whatsapp:</b> 11 6128-6695 <em>(solo mensajes)</em></p>
              <p><b>Email:</b> cmavellaneda@apres.com.ar</p>
            </div>
          </div>
          <div className="cardh">
            <h2 className="centertitles">Centro Médico Berazategui</h2>
            <div className="centerdata">
              <p>Mitre Esq. 18, Berazategui Centro</p>
              <p><b>Tel:</b> 4226-3657 / 8714</p>
              <p><b>Whatsapp:</b> 11 5004-3433 <em>(solo mensajes)</em></p>
              <p><b>Email:</b> cmberazategui@apres.com.ar</p>
            </div>
          </div>
          <div className="cardh">
            <h2 className="centertitles">Centro Médico Quilmes Centro</h2>
            <div className="centerdata">
              <p>9 de Julio 130, Quilmes Centro</p>
              <p><b>Tel:</b> 7540-8163 / 7544-5715 / 4254-0734</p>
              <p><b>Whatsapp:</b> 11 2728-6519 <em>(solo mensajes)</em></p>
              <p><b>Email:</b> cmquilmes@apres.com.ar</p>
            </div>
          </div>
        </div>

        <div className="cardsh">
          <div className="cardh">
            <h2 className="centertitles">Centro Médico Quilmes Oeste</h2>
            <div className="centerdata">
              <p>12 de Octubre 988, Quilmes Oeste</p>
              <p><b>Tel:</b> 4468-7250 / 7232</p>
              <p><b>Whatsapp:</b> 11 6030-1194 <em>(solo mensajes)</em></p>
              <p><b>Email:</b> cmquilmesoeste@apres.com.ar</p>
            </div>
          </div>
          <div className="cardh">
            <h2 className="centertitles">Centro Médico Florencio Varela</h2>
            <div className="centerdata">
              <p>Leandro N. Alem 49, Florencio Varela</p>
              <p><b>Tel:</b> 4237-0801 / 7510 / 4287-2804</p>
              <p><b>Whatsapp:</b> 11 5463-7262 <em>(solo mensajes)</em></p>
              <p><b>Email:</b> cmvarela@apres.com.ar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="split-background">
        <div className="left">
          <div className="region-list">
            <h2 className="region-title">Sanatorios de <span className="blue">prestigio</span> en Capital Federal y GBA</h2>
            <p className="region-subtitle">
              Con Apres Global tenés la tranquilidad de estar cubierto con los mejores centros de salud:
            </p>

            {zonas.map((zona, index) => (
              <div key={index} className="accordion">
                <button className="accordion-toggle" onClick={() => toggle(index)}>
                  {zona.nombre}
                </button>
                <div className={`accordion-content ${activeIndex === index ? "open" : ""}`}>
                  <ul>
                    {zona.sanatorios.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right"></div>
      </div>

    </div>
  );
};

export default Hospital;