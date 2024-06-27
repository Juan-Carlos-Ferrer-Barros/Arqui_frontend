import './Ticket.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';

function Ofertas() {

    const token = localStorage.getItem('token');
    const [reservations, setReservations] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isLogged, setIsLogged] = useState(token !== "null");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/reservations`, {
            headers: { Authorization: `${token}` }
        })
        .then(response => {
            setReservations(response.data); // Asumiendo que response.data es un arreglo de vuelos
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching flight information:', error);
        });
    }, []);

    const realizarPosibleCompra = (request) => {
        if (!isLogged) {
            alert("Debe iniciar sesión para comprar.");
        } 
        else {
            navigate(`/compraoferta/${request._id}`);
        }
    };

    // Filtrar los vuelos por validationStatus igual a 'accepted'
    const aprovedRequests = reservations.filter(reservation => reservation.validationStatus === 'accepted');

    return (
        <div className='scroll'>
            <h1 className='titleNoNavbar'>Ofertas del Administrador</h1>

            {aprovedRequests.map((reservation, index) => (
            <button key={index}>
            <div key={index} className={`ticket-container ${selectedFlight === index ? 'selected' : ''}`} onClick={() => setSelectedFlight(index)} style={{ top: `${410 + index * 200}px` }}>
                <div className='ticket-distribución'>
                    <h2>{reservation.departure_time.slice(11, 16)} {reservation.departure_airport_id}</h2>
                    <h3>Duración</h3>
                    <h2>{reservation.flight_info.arrival_time.split(' ')[1]} {reservation.arrival_airport_id}</h2>
                    <h3>Tarifa desde</h3>
                    <p></p>
                    <p>{Math.floor(reservation.flight_info.duration/60)}h {reservation.flight_info.duration%60} min</p>
                    <p></p>
                    <p>CLP {reservation.flight_info.price}</p>
                </div>
                <hr className='line'/>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className='tipo'>Directo</p>
                    {selectedFlight === index && (
                        // Quiero que solo si isAdmin = True, se pueda comprar un pasaje 
                        // y si no, se muestre un mensaje que diga "Debe iniciar sesión para comprar"
                        
                        <button className='buy-ticket' onClick={() => realizarPosibleCompra(reservation)}>Comprar pasaje</button>
                    )}
                </div>
            </div>
            </button>
        ))}
        </div>
    )
}

export default Ofertas;
