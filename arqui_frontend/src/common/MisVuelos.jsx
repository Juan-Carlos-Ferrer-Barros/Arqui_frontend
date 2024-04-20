import './Ticket.css'
import DarkLogo from '../assets/darklogo.png'
import Background from '../assets/background.jpg'


function MisVuelos() {

    const flightss = {"flights": [
        {"_id":"661485cebd518fd34878e1fd","flights":[{"departure_airport":{"name":"Aeropuerto de Roma-Fiumicino","id":"FCO","time":"2024-04-16 13:00"},"arrival_airport":{"name":"Aeropuerto Internacional de São Paulo-Guarulhos","id":"GRU","time":"2024-04-16 19:40"},"duration":700,"airplane":"Boeing 787","airline":"LATAM","airline_logo":"https://www.gstatic.com/flights/airline_logos/70px/LA.png"}],"price":379971,"carbonEmission":{"this_flight":659000},"airlineLogo":"https://www.gstatic.com/flights/airline_logos/70px/LA.png","currency":"CLP","createdAt":"2024-04-09T00:03:26.975Z","lastUpdate":"2024-04-09T00:03:26.975Z","availableSeats":90},
        {"_id":"661486fbbd518fd34878e1fe","flights":[{"departure_airport":{"name":"Aeropuerto Adolfo Suárez Madrid-Barajas","id":"MAD","time":"2024-04-16 01:45"},"arrival_airport":{"name":"Aeropuerto Internacional El Dorado","id":"BOG","time":"2024-04-16 04:54"},"duration":609,"airplane":"Boeing 787","airline":"Avianca","airline_logo":"https://www.gstatic.com/flights/airline_logos/70px/AV.png"}],"price":394085,"carbonEmission":{"this_flight":592000},"airlineLogo":"https://www.gstatic.com/flights/airline_logos/70px/AV.png","currency":"CLP","createdAt":"2024-04-09T00:08:27.066Z","lastUpdate":"2024-04-09T00:08:27.066Z","availableSeats":90}
    ]}

    return (
        <div className='scroll'>
            <h1 className='title'>Mis Viajes</h1>

            {flightss.flights.map((flight, index) => (
            <div key={index} className='ticket-container' style={{ top: `${490 + index * 200}px` }}>
                <div className='ticket-distribución'>
                    <h2>{flight.flights[0].departure_airport.time.split(' ')[1]} {flight.flights[0].departure_airport.id}</h2>
                    <h3>Duración</h3>
                    <h2>{flight.flights[0].arrival_airport.time.split(' ')[1]} {flight.flights[0].arrival_airport.id}</h2>
                    <h3>Tarifa desde</h3>
                    <p></p>
                    <p>{Math.floor(flight.flights[0].duration/60)}h {flight.flights[0].duration%60} min</p>
                    <p></p>
                    <p>CLP {flight.price}</p>
                </div>
                <hr className='line'/>
                <p className='tipo'>Directo</p>
            </div>
        ))}
        

        </div>
        )
    }

export default MisVuelos;
