import React, { useEffect, useState } from 'react';
import '../styles/styles.css';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const hasScroll = fullHeight > windowHeight;

      if (!hasScroll) {
        setShowFooter(true);
      } else {
        const atBottom = scrollTop + windowHeight >= fullHeight - 10;
        setShowFooter(atBottom);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return showFooter ? (
    <footer>
      <p>Realizado por Luciana Danise - Utilizado para la Práctica Profesional Supervisada 2025 - UTN FRLP</p>
    </footer>
  ) : null;
};

export default Footer;