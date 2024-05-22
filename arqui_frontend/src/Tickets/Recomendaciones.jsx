import './Ticket.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';



function AllTickets() {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLogged, setIsLogged] = useState(token !== "null");

    const realizarPosibleCompra = (flight) => {
        if (!isLogged) {
            alert("Debe iniciar sesión para comprar.");
        } else {
            navigate(`/compra/${flight._id}`);
        }
    };

    useEffect(() => {
        axios.get('https://api.nukor.xyz/recommendations')
            .then(response => {
                setFlights(response.data.flights);  // Asumiendo que la respuesta es un objeto con una propiedad 'flights'
            })
            .catch(error => console.error('Error fetching recommendations:', error));
    }, []);

    return (
    <div className='scroll'>
        <h1 className='titleNoNavbar'>Vuelos Recomendados</h1>

        {flights.map((flight, index) => (
            <button>
            <div key={index} className={`ticket-container ${selectedFlight === index ? 'selected' : ''}`} onClick={() => setSelectedFlight(index)} style={{ top: `${490 + index * 200}px` }}>
                <div className='ticket-distribución'>
                    <h2>{flight.departure_time.slice(11, 16)} {flight.departure_airport_id}</h2>
                    <h3>Duración</h3>
                    <h2>{flight.arrival_time.split(" ")[1]} {flight.arrival_airport_id}</h2>
                    <h3>Tarifa desde</h3>
                    <p></p>
                    <p>{Math.floor(flight.duration/60)}h {flight.duration%60} min</p>
                    <p></p>
                    <p>CLP {flight.price}</p>
                </div>
                <hr className='line'/>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className='tipo'>Directo</p>
                    {selectedFlight === index && (
                        <button className='buy-ticket' onClick={() => realizarPosibleCompra(flight)}>Comprar pasaje</button>
                    )}
                </div>
            </div>
            </button>
        ))}

    <div className='pagecontainer' style={{ top: `${360 + flights.length * 200}px` }}>
            <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
             <span className='separador'></span>
             <button onClick={nextPage}>Siguiente</button>
    </div>
    <div className='espacio'></div>
</div>
    )
}

export default AllTickets;