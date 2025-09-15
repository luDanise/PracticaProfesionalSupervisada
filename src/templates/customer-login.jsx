import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import '../styles/stylestemplate.css';
import Footer from '../components/footer';
import BackButton from '../components/backbutton';
import SellerLoginButton from '../components/sellerlogin';
import apresazul from '../images/apresazul.png';
import LoginButton from '../components/loginbutton';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        if (!email) {
            setMensaje('Por favor ingresá tu correo electrónico');
            return;
        } else {
            setMensaje('Por favor ingresá tu contraseña');
            return;
        }
    }

    try {
      const response = await axios.post('http://localhost:8000/api/customer-login/', {
        email,
        password
      });

      const { redirect, first_name, customer_id } = response.data;

      if (redirect) {
        localStorage.setItem('customer_name', first_name);
        localStorage.setItem('customer_id', customer_id);
        navigate('/customer-index');
      } else {
        setMensaje('Login fallido');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMensaje('Contraseña incorrecta');
      } else if (error.response?.status === 404) {
        setMensaje('Usuario no encontrado');
      } else {
        setMensaje('Error de conexión con el servidor');
      }
    }
  };

  return (
    <div className="screen">
      
      <div className="background-image"></div>
      <div className="container">
        <div className="components">
          <BackButton />
          <SellerLoginButton />
        </div>
        <div className="logo-apres-container">
          <img src={apresazul} alt="Logo Apres" className="logo-apres" />
          <div className="form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="form">
                <label htmlFor="email" className="labelli">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="Correo Electrónico..."
                  className="formfieldli"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form password-wrapper">
                <label htmlFor="password" className="labelli">Contraseña</label>
                <div className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña..."
                    className="formfieldli"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="error">
                {mensaje && <div className="error-message">{mensaje}</div>}
              </div>
              <div className="formbutton">
                <LoginButton onClick={handleLogin} />
              </div>
              <div className="text">
                <p>¿No tienes una cuenta? <a href="/customer-signup">Regístrate ahora</a></p>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>

    </div>
  );
};

export default CustomerLogin;