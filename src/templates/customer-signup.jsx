import React, { useState } from 'react';
import '../styles/styles.css';
import Footer from '../components/footer';
import BackButton from '../components/backbutton';
import apresazul from '../images/apresazul.png';
import axios from 'axios';
import SignUpButton from '../components/signupbutton';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birthDate: '',
    province: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'Por favor ingresá tu nombre';
    if (!formData.last_name) newErrors.last_name = 'Por favor ingresá tu apellido';
    if (!formData.birthDate) newErrors.birthDate = 'Por favor ingresá tu fecha de nacimiento';
    if (!formData.province) newErrors.province = 'Por favor ingresá tu provincia';
    if (!formData.email) newErrors.email = 'Por favor ingresá tu correo electrónico';
    if (!formData.password) newErrors.password = 'Por favor ingresá tu contraseña';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/customer-signup/', formData);
      if (response.status === 201) {
        setMensaje('Usuario creado correctamente');
        setFormData({
          first_name: '',
          last_name: '',
          birthDate: '',
          province: '',
          email: '',
          password: ''
        });
        setErrors({});
      }
    } catch (error) {
      setMensaje('Error al crear el usuario');
      console.error(error);
    }
  };

  return (
    <div className="screen">

      <div className="background-image"></div>
      <BackButton />
      <div className="logo-apres-container">
        <img src={apresazul} alt="Logo Apres" className="logo-apres" />
        <div className="form">
          <h2>Crear nuevo usuario</h2>
          <form onSubmit={handleSignup}>
            <div className="formsignup">
              {[
                { name: 'first_name', label: 'Nombre', type: 'text', placeholder: 'Nombre...' },
                { name: 'last_name', label: 'Apellido', type: 'text', placeholder: 'Apellido...' },
                { name: 'birthDate', label: 'Fecha de Nacimiento', type: 'date' },
                { name: 'province', label: 'Provincia', type: 'text', placeholder: 'Provincia...' },
                { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'Correo Electrónico...' },
                { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Contraseña...' }
              ].map(({ name, label, type, placeholder }) => (
                <div className="formsu" key={name}>
                  <label htmlFor={name} className="label">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="formfield"
                    placeholder={placeholder}
                  />
                  <div className="errorsu">
                    {errors[name] && <div className="error-message">{errors[name]}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="formsubutton">
                <SignUpButton />
            </div>
            <div className="success"> 
              {mensaje && <div className="success-message">{mensaje}</div>}
            </div>
          </form>
        </div>
      </div>
      <div className="container"><Footer /></div>
      
    </div>
  );
};

export default CustomerSignup;