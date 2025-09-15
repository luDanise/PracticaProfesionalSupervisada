import React from 'react';
import '../styles/styles.css';
import '../styles/stylestemplate.css';
import Footer from '../components/footer';
import apresazul from '../images/apresazul.png';
import { Link } from 'react-scroll';
import LoginIndex from '../components/loginindex';
import Inf from '../components/inf';
import AboutUs from '../components/aboutus';
import Services from '../components/services';
import Hospital from '../components/hospital';
import Contact from '../components/contact';
import Emergency from '../components/emergency';
import MoreInfo from '../components/moreinfo';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>

      <nav className="navind">
        <Link to="top" smooth={true} duration={500}><img src={apresazul} alt="Logo Apres" className="logo-apres-navbar" /></Link>
        <div className="information">
          <Link to="aboutus" className="linkindex" smooth={true} duration={500}>Sobre Nosotros</Link>
          <Link to="services" className="linkindex" smooth={true} duration={500}>Planes y Servicios</Link>
          <Link to="hospital" className="linkindex" smooth={true} duration={500}>Centros Médicos</Link>
          <Link to="contact" className="linkindex" smooth={true} duration={500}>Contacto</Link>
          <Link to="emergency" smooth={true} duration={500} className="red">Emergencias</Link>
          <Link to="moreinfo" className="linkindex" smooth={true} duration={500}>Más Información</Link>
        </div>
        <LoginIndex />
      </nav>

      <div id="top"><Inf /></div>
      <div id="aboutus"><AboutUs /></div>
      <div id="services"><Services /></div>
      <div id="hospital"><Hospital /></div>
      <div id="contact"><Contact /></div>
      <div id="emergency"><Emergency /></div>
      <div id="moreinfo"><MoreInfo /></div>
      <div><Footer /></div>
      
    </div>
  );
};

export default Index;