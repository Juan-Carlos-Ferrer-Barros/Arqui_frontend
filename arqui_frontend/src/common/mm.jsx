import './Ticket.css'
import DarkLogo from '../assets/darklogo.png'
import Background from '../assets/background.jpg'
import seat from '../assets/seat.jpg'
import arrival from '../assets/arrival.jpg'
import departure from '../assets/departure.jpg'
import date from '../assets/date.jpg'
import person from '../assets/person.jpg'
import { useState, useEffect } from 'react'



function Ticket() {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        // Aquí puedes realizar la llamada a la API para obtener los datos de los vuelos
        // y luego establecer los datos de vuelo en el estado usando setFlights
        fetch('https://api.nukor.xyz/flights')
        .then(response => response.json())
        .then(data => setFlights(data.flights));
    }, []);

    const flightss = {"flights": [
        {"_id":"661485cebd518fd34878e1fd","flights":[{"departure_airport":{"name":"Aeropuerto de Roma-Fiumicino","id":"FCO","time":"2024-04-16 13:00"},"arrival_airport":{"name":"Aeropuerto Internacional de São Paulo-Guarulhos","id":"GRU","time":"2024-04-16 19:40"},"duration":700,"airplane":"Boeing 787","airline":"LATAM","airline_logo":"https://www.gstatic.com/flights/airline_logos/70px/LA.png"}],"price":379971,"carbonEmission":{"this_flight":659000},"airlineLogo":"https://www.gstatic.com/flights/airline_logos/70px/LA.png","currency":"CLP","createdAt":"2024-04-09T00:03:26.975Z","lastUpdate":"2024-04-09T00:03:26.975Z","availableSeats":90},
        {"_id":"661486fbbd518fd34878e1fe","flights":[{"departure_airport":{"name":"Aeropuerto Adolfo Suárez Madrid-Barajas","id":"MAD","time":"2024-04-16 01:45"},"arrival_airport":{"name":"Aeropuerto Internacional El Dorado","id":"BOG","time":"2024-04-16 04:54"},"duration":609,"airplane":"Boeing 787","airline":"Avianca","airline_logo":"https://www.gstatic.com/flights/airline_logos/70px/AV.png"}],"price":394085,"carbonEmission":{"this_flight":592000},"airlineLogo":"https://www.gstatic.com/flights/airline_logos/70px/AV.png","currency":"CLP","createdAt":"2024-04-09T00:08:27.066Z","lastUpdate":"2024-04-09T00:08:27.066Z","availableSeats":90}
    ]}

    const rectangles = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="App">
          <h1>Lista de Rectángulos</h1>
          <div className="rectangle-container">
            {rectangles.map(rectangle => (
              <div key={rectangle} className="rectangle">Rectángulo {rectangle}</div>
            ))}
          </div>
        </div>
      );
}

export default Ticket;