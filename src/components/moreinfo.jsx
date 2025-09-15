import React, { useState } from 'react';
import '../styles/styles.css';
import axios from 'axios';

const MoreInfo = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    general_reason: '',
    city: ''
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.full_name) newErrors.full_name = 'Ingresá tu nombre y apellido';
    if (!formData.full_name || !formData.full_name.includes(' ')) {
      newErrors.full_name = 'Ingresá tu nombre y apellido separados por un espacio';
    }
    if (!formData.email) newErrors.email = 'Ingresá tu correo electrónico';
    if (!formData.phone) newErrors.phone = 'Ingresá tu celular';
    if (!formData.general_reason) newErrors.general_reason = 'Ingresá el motivo de consulta';
    if (!formData.city) newErrors.city = 'Seleccioná tu ciudad';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/query/', formData);
      if (response.status === 201) {
        setMensaje('Consulta enviada correctamente');
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          general_reason: '',
          city: ''
        });
        setErrors({});
      }
    } catch (error) {
      setMensaje('Error al enviar la consulta');
      console.error(error);
    }
  };

  return (
    <div className="moreinfo">

      <div className="datamoreinfo">
        <h2 className="sloganw">Asesoramiento personalizado</h2>
        <p className="ci">
          Si tenés alguna duda o querés una asistencia personalizada, completá el siguiente formulario para poder comunicarte con algún vendedor de tu cercanía
        </p>
      </div>

      <div className="formmoreinfo">
        <h3 className="formoreinfo">Para más información, necesitamos conocerte:</h3>
        <form onSubmit={handleSubmit}>
          <div className="formmi">
            {[
              { name: 'full_name', label: 'Nombre y Apellido', type: 'text', placeholder: 'Nombre y Apellido...' },
              { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'Correo electrónico...' },
              { name: 'phone', label: 'Celular', type: 'tel', placeholder: 'Celular...' },
              { name: 'general_reason', label: 'Motivo general de consulta', type: 'text', placeholder: 'Motivo general de consulta...' }
            ].map(({ name, label, type, placeholder }) => (
              <div className="formmorin" key={name}>
                <label htmlFor={name} className="labelmi">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="formfieldmi"
                  placeholder={placeholder}
                />
                <div className="errormi">
                  {errors[name] && <div className="error-messagemi">{errors[name]}</div>}
                </div>
              </div>
            ))}
            <div className="formmorin">
              <label htmlFor="city" className="labelmi">Ciudad</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="formfieldcity"
              >
                <option value="" disabled>Seleccionar Ciudad...</option>
                <option value="La Plata">La Plata</option>
                <option value="Quilmes">Quilmes</option>
                <option value="CABA">CABA</option>
                <option value="Adrogue">Adrogué</option>
                <option value="Florencio Varela">Florencio Varela</option>
              </select>
              <div className="errormi">
                {errors.city && <div className="error-message">{errors.city}</div>}
              </div>
              <p className="form-note">
                En caso de no encontrar la tuya, por favor seleccioná la ciudad más cercana para poder asignarte un vendedor de tus alrededores.
              </p>
            </div>
          </div>
          <button type="submit" className="btn-enviar">Enviar</button>
          <div className="successmi">
            {mensaje && <div className="success-message">{mensaje}</div>}
          </div>
        </form>
      </div>

    </div>
  );
};

export default MoreInfo;