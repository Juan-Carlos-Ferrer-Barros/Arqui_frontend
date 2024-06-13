import './Recommendations.css';
// import { Suspense } from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



export default function Recommendations() {

  const token = localStorage.getItem('token');
  const isLogged = token !== "null";
  // const [flightIds, setFlightIds] = useState([]);
  // const [flights, setFlights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
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
    axios.get(`${import.meta.env.VITE_API_URL}/recommendations`, {
      headers: { Authorization: `${token}` }
    })
      .then((response) => {
        console.log('=======', response);
        setRecommendations(response.data.recommendations || recommendations)
      })
      .catch(error => console.error('Error fetching flight information:', error));
  }, []);

  console.log('Recomendaciones:', recommendations);
  // useEffect(() => {
  //   flightIds.forEach(flightId => {
  //     fetch(`${import.meta.env.VITE_API_URL}/flights/${flightId}`,)
  //       .then(response => setFlights([...flights, response.json()]))
  //       .catch(error => console.error('Error fetching flight information:', error));
  //   });
  // }, [flightIds]);
  const filteredRecommendations = recommendations.filter(recommendation => recommendation.flights.length > 0);
  return (
    <div className='scroll'>
      {filteredRecommendations.length === 0 ? <h1 className='titleNoNavbar'>No hay recomendaciones</h1>: <h1 className='titleNoNavbar'>Recomendaciones</h1>}
      {filteredRecommendations.length > 0 &&
        filteredRecommendations.map((recommendation, index) => (
            <div key={index}>
              <h1 className='titleNoNavbar'>Recomendaciones de vuelos que salen de {recommendation.flights[0].departure_airport_id}</h1>
              <h1 className='titleNoNavbar'>Creada el {recommendation.createdAt.split('T')[0]}</h1>
              {recommendation.flights.map((flight, index) => (
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
        ))
      }
    </div>
    
    // <div className='scroll'>
    //   <h1 className='titleNoNavbar'>Recomendaciones</h1>
    //   {recommendations.length === 0 && <h1 className='titleNoNavbar'>No hay recomendaciones</h1>}
    //   {recommendations.length > 0 &&
    //     recommendations.map((flights, index) => (
    //       flights.length === 0 && <h1 className='titleNoNavbar'>------------------------</h1>
    //       flights.length > 0 &&
    //       flights.map((flight, index) => (
    //         <button key={index}>
    //           <div key={index} className={`ticket-container ${selectedFlight === index ? 'selected' : ''}`} onClick={() => setSelectedFlight(index)} style={{ top: `${490 + index * 200}px` }}>
    //             <div className='ticket-distribución'>
    //               <h2>{flight.departure_time.slice(11, 16)} {flight.departure_airport_id}</h2>
    //               <h3>Duración</h3>
    //               <h2>{flight.arrival_time.split(" ")[1]} {flight.arrival_airport_id}</h2>
    //               <h3>Tarifa desde</h3>
    //               <p></p>
    //               <p>{Math.floor(flight.duration / 60)}h {flight.duration % 60} min</p>
    //               <p></p>
    //               <p>CLP {flight.price}</p>
    //             </div>
    //             <hr className='line' />
    //             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //               <p className='tipo'>Directo</p>
    //               {selectedFlight === index && (
    //                 <button className='buy-ticket' onClick={() => realizarPosibleCompra(flight)}>Comprar pasaje</button>
    //               )}
    //             </div>
    //           </div>
    //         </button>
    //     ))
    // </div>
  )
}