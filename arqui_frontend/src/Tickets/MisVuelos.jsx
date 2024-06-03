import './Ticket.css'
import { useState, useEffect } from 'react'
import axios from 'axios';

function EstadoCompras() {

    const token = localStorage.getItem('token');
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/requests`, {
            headers: { Authorization: `${token}` }
        })
        .then(response => {
            setRequests(response.data); // Asumiendo que response.data es un arreglo de vuelos
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching flight information:', error);
        });
    }, []);

    // Filtrar los vuelos por validationStatus igual a 'accepted'
    const aprovedRequests = requests.filter(request => request.validationStatus === 'accepted');

    return (
        <div className='scroll'>
            <h1 className='titleNoNavbar'>Mis Viajes</h1>

            {aprovedRequests.map((request, index) => (
                <div key={index} className='ticket-container' style={{ top: `${330 + index * 200}px` }}>
                    <div className='ticket-distribución'>
                        <h2>{request.departure_time.slice(11,16)} {request.flight_info[0].departure_airport_id}</h2>
                        <h3>Duración</h3>
                        <h2>{request.flight_info[0].arrival_time.split(" ")[1]} {request.flight_info[0].arrival_airport_id}</h2>
                        <h3>Tarifa desde</h3>
                        <p></p>
                        <p>{Math.floor(request.flight_info[0].duration / 60)}h {request.flight_info[0].duration % 60} min</p>
                        <p></p>
                        <p>CLP {request.flight_info[0].price}</p>
                    </div>
                    <hr className='line'/>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className='tipo'>Directo</p>
                        <p className='validation'>{request.validationStatus}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EstadoCompras;
