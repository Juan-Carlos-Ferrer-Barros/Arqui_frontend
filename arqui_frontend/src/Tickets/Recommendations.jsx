import './Recommendations.css';
// import { Suspense } from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Recommendations() {

  const token = localStorage.getItem('token');
  const isLogged = token !== "null";
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const navigate = useNavigate();

  const realizarPosibleCompra = (flight) => {
    if (!isLogged) {
      alert("Debe iniciar sesión para comprar.");
    } else {
      navigate(`/compra/${flight._id}`);
    }
  };

  useEffect(() => {
    fetch('https://api.nukor.xyz/recommendations', {
      headers: { Authorization: `${token}` }
    })
      .then(response => setFlights(response.json().flights))
      .catch(error => console.error('Error fetching flight information:', error));
  }, []);

  return (
    <div className='scroll'>
      <h1 className='titleNoNavbar'>Recomendaciones</h1>

      {flights.map((flight, index) => (
        <button key={index}>
          <div key={index} className={`ticket-container ${selectedFlight === index ? 'selected' : ''}`} onClick={() => setSelectedFlight(index)} style={{ top: `${490 + index * 200}px` }}>
            <div className='ticket-distribución'>
              <h2>{flight.departure_time.slice(11, 16)} {flight.departure_airport_id}</h2>
              <h3>Duración</h3>
              <h2>{flight.arrival_time.split(" ")[1]} {flight.arrival_airport_id}</h2>
              <h3>Tarifa desde</h3>
              <p></p>
              <p>{Math.floor(flight.duration / 60)}h {flight.duration % 60} min</p>
              <p></p>
              <p>CLP {flight.price}</p>
            </div>
            <hr className='line' />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className='tipo'>Directo</p>
              {selectedFlight === index && (
                <button className='buy-ticket' onClick={() => realizarPosibleCompra(flight)}>Comprar pasaje</button>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}