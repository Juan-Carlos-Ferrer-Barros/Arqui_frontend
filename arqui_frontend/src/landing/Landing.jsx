import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import planeImage from '../assets/plane.png';
import anuncioImage from '../assets/anuncio.jpeg';
import { useState, useEffect } from 'react'


const Landing = () => {

  const [formData, setFormData] = useState({
    formDeparture: '',
    formArrival: '',
    formDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <div>
      <div>
        <img src={planeImage} alt='Plane' className='plane-image' />
      </div>
      <div className='search-box'>
        <h1>Buscar vuelos</h1>
        <form action="/ticket/flights" method="get" className='search-form'>
          <input type='text' placeholder='Origen' name ='formDeparture' onChange={handleChange}/> 
          <input type='text' placeholder='Destino' name ='formArrival' onChange={handleChange}/> 
          <input type='date' placeholder='Fecha' name ='formDate' onChange={handleChange}/>
          <Link
                to={`/ticket/flights/${formData.formDeparture}/${formData.formArrival}/${formData.formDate}`}
            ><button>Buscar</button></Link>
        </form>
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
          <a href= '/tickets'><button>Todos los vuelos</button></a>
          <button> Información de equipaje</button>
        </div>
      </div>

    
    </div>
    
  );
};

export default Landing;
