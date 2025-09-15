import React from 'react';
import '../styles/styles.css';

const AboutUs = () => {
  return (
    <div className="aboutus">

        <div className="cardone">
          <h2 className="slogan">Sobre Nosotros</h2>
          <p className="space">Desde 1974, en Apres nos dedicamos a brindar servicios médicos de alta calidad, poniendo siempre en 
            el centro a las personas.
            Creemos que la salud no es solo una cuestión médica, sino también humana, social y solidaria. Por eso, nos esforzamos 
            por ofrecer una atención integral que tenga en cuenta todas las dimensiones de la persona.</p>
          <p className="space">Aspiramos a ser líderes en el financiamiento de prestaciones médicas, ofreciendo a nuestros asociados
             una cobertura integral que abarque todos los aspectos de su salud.
            Apres te brinda cobertura médica integral en toda Capital Federal, Gran Buenos Aires y La Plata. No importa dónde estés,
             tu salud siempre estará protegida.</p>
        </div>

        <div className="cardtwo">
          <div className="misionvision">
            <h3>Misión</h3>
            <p className="mv">Brindar servicios médicos de alta calidad, priorizando el contenido humano, social y solidario, 
              entendiendo que la salud no solo implica atención clínica, sino también contención y compromiso 
              con las personas.</p>
          </div>
          <div className="misionvision">
            <h3>Visión</h3>
            <p className="mv">Apres busca consolidarse como un sistema de financiamiento de prestaciones médicas que promueva 
              la protección integral de la persona humana, con un enfoque solidario hacia toda la sociedad.</p>
          </div>
        </div>
        
    </div>
  );
};

export default AboutUs;