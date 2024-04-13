import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <div className="hero">
        <h1>¡Encuentra los mejores vuelos al mejor precio!</h1>
        <p>Reserva tu próximo viaje con nosotros y descubre destinos increíbles.</p>
        <Link to="/buscar" className="btn btn-primary">Buscar vuelos</Link>
      </div>
      <div className="features">
        <div className="feature">
          <h2>Ofertas Especiales</h2>
          <p>Descubre nuestras ofertas especiales en vuelos a destinos populares.</p>
        </div>
        <div className="feature">
          <h2>Destinos Populares</h2>
          <p>Explora nuestros destinos más solicitados y encuentra tu próximo viaje.</p>
        </div>
        <div className="feature">
          <h2>Reseñas de Clientes</h2>
          <p>Lee las experiencias de nuestros clientes satisfechos con nuestros servicios.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
