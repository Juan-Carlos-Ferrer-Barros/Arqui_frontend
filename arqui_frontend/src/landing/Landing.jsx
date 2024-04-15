import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import planeImage from '../assets/plane.png';
import anuncioImage from '../assets/anuncio.jpeg';

const Landing = () => {
  return (
    <div>
      <div>
        <img src={planeImage} alt='Plane' className='plane-image' />
      </div>
      <div className='search-box'>
        <h1>Buscar vuelos</h1>
        <div className='search-form'>
          <input type='text' placeholder='Origen' /> 
          <input type='text' placeholder='Destino' /> 
          <input type='date' placeholder='Fecha' />
          <button>Buscar</button>
      </div>
        </div>
      <div className='anuncios'>
        <img src={anuncioImage} alt='Anuncio' className='anuncio-image' />
        <div className='anuncios-text'>
          <h2>¡Reserva el vuelo ideal para tus vacaciones!</h2>
          <h3>Además acumulas 3 Millas flightsUC Pass por cada US$1 que gastes</h3>
        </div>
      </div>
      <div className='info-box'>
        <div className='info-buttons'>
          <button> Administra tu viaje</button>
          <button> Revisa el estado de tu compra</button>
          <button> Derechos y deberes al viajar</button>
          <button> Información de equipaje</button>
        </div>
      </div>

    
    </div>
    
  );
};

export default Landing;
