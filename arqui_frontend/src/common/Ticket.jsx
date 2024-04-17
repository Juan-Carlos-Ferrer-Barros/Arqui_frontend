import './Ticket.css'
import DarkLogo from '../assets/darklogo.png'
import Background from '../assets/background.jpg'
import seat from '../assets/seat.jpg'
import arrival from '../assets/arrival.jpg'
import departure from '../assets/departure.jpg'
import dateLogo from '../assets/date.jpg'
import person from '../assets/person.jpg'
import { useState, useEffect } from 'react'



function Ticket() {

    const [flights, setFlights] = useState([]);
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const date = new Date();
    const dateMas1 = new Date();
    dateMas1.setDate(date.getDate() + 1);
    const dateMas2 = new Date();
    dateMas2.setDate(date.getDate() + 2);
    const dateMenos1 = new Date();
    dateMenos1.setDate(date.getDate() - 1);
    const dateMenos2 = new Date();
    dateMenos2.setDate(date.getDate() - 2);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentPage, setCurrentPage] = useState(1);

    const [filteredFlightLength, setFilteredFlightLength] = useState(0);

    useEffect(() => {
        // Aquí puedes realizar la llamada a la API para obtener los datos de los vuelos
        // y luego establecer los datos de vuelo en el estado usando setFlights
        fetch(`https://api.nukor.xyz/flights?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            setFlights(data.flights);
            setFilteredFlightLength(data.flights.filter(flight => {
                const flightDate = new Date(flight.flights[0].departure_airport.time);
                return (
                    flightDate.getDate() === selectedDate.getDate() &&
                    flightDate.getMonth() === selectedDate.getMonth() &&
                    flightDate.getFullYear() === selectedDate.getFullYear()
                );
            }).length);
        });
    }, [currentPage]);


    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Función para ir a la página anterior
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
    <div className='scroll'>
        <div className='secondNavbar'>
            <button> 
                <img src={departure} alt="Logo" className="leftairplane-container"/> Origen      
                <img src={arrival} alt="Logo" className="rightairplane-container"/> Destino
            </button>
            <span className='separador'></span>
            <button> 
                <img src={dateLogo} alt="Logo" className="date-container"/> Fecha
            </button>
            <span className='separador'></span>
            <button> 
                <img src={person} alt="Logo" className="icon-container"/> Cantidad pasajes
            </button>
            <span className='separador'></span>
            <button> 
                <img src={seat} alt="Logo" className="icon-container"/> Economy
            </button>
        </div>
        <h1 className='title'>Elige un vuelo</h1>
        <div className='datecontainer'>
             <span className='separador'></span>
            <button onClick={() => setSelectedDate(dateMenos2)}>{daysOfWeek[dateMenos2.getDay()].slice(0, 3)}, {dateMenos2.getDate()}-{dateMenos2.getMonth()+1}</button>
            <span className='separador'></span>
            <button onClick={() => setSelectedDate(dateMenos1)}>{daysOfWeek[dateMenos1.getDay()].slice(0, 3)}, {dateMenos1.getDate()}-{dateMenos1.getMonth()+1}</button>
            <span className='separador'></span>
            <button onClick={() => setSelectedDate(date)}>{daysOfWeek[date.getDay()].slice(0, 3)}, {date.getDate()}-{date.getMonth()+1}</button>
            <span className='separador'></span>
            <button onClick={() => setSelectedDate(dateMas1)}>{daysOfWeek[dateMas1.getDay()].slice(0, 3)}, {dateMas1.getDate()}-{dateMas1.getMonth()+1}</button>
            <span className='separador'></span>
            <button onClick={() => setSelectedDate(dateMas2)}>{daysOfWeek[dateMas2.getDay()].slice(0, 3)}, {dateMas2.getDate()}-{dateMas2.getMonth()+1}</button>
            <span className='separador'></span>
        </div>
        
        {flights.filter(flight => {
            // Convertir la fecha de vuelo a un objeto Date
            const flightDate = new Date(flight.flights[0].departure_airport.time);
            
            // Comprobar si la fecha del vuelo es igual a la fecha del botón
            return (
                flightDate.getDate() === selectedDate.getDate() &&
                flightDate.getMonth() === selectedDate.getMonth() &&
                flightDate.getFullYear() === selectedDate.getFullYear()
            );
        }).map((filteredFlight, index) => (
            <div key={index} className='ticket-container' style={{ top: `${490 + index * 200}px` }}>
                <div className='ticket-distribución'>
                    <h2>{filteredFlight.flights[0].departure_airport.time.split(' ')[1]} {filteredFlight.flights[0].departure_airport.id}</h2>
                    <h3>Duración</h3>
                    <h2>{filteredFlight.flights[0].arrival_airport.time.split(' ')[1]} {filteredFlight.flights[0].arrival_airport.id}</h2>
                    <h3>Tarifa desde</h3>
                    <p></p>
                    <p>{Math.floor(filteredFlight.flights[0].duration/60)}h {filteredFlight.flights[0].duration%60} min</p>
                    <p></p>
                    <p>CLP {filteredFlight.price}</p>
                </div>
                <hr className='line'/>
                <p className='tipo'>Directo</p>
            </div>
        ))}
    
    <div className='datecontainer' style={{ top: `${490 + filteredFlightLength * 200}px` }}>
            <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
             <span className='separador'></span>
             <button onClick={nextPage}>Siguiente</button>
    </div>

    </div>
    )
}

export default Ticket;