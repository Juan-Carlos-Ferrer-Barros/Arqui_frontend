import './Ticket.css'
import seat from '../assets/seat.jpg'
import arrival from '../assets/arrival.jpg'
import departure from '../assets/departure.jpg'
import dateLogo from '../assets/date.jpg'
import person from '../assets/person.jpg'
import { useState, useEffect } from 'react'
import { useParams , Link} from 'react-router-dom';




function Ticket() {

    let { formDeparture, formArrival, formDate } = useParams();

    const hasParams = formDeparture && formArrival && formDate;

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


    useEffect(() => {
        if (hasParams) {
            const utcDate = new Date(formDate);
            const timezoneOffset = new Date().getTimezoneOffset();
            const adjustedDate = new Date(utcDate.getTime() + timezoneOffset * 60000);
            setSelectedDate(adjustedDate);
        } else {
            setSelectedDate(null);
            formDeparture = "";
            formArrival = "";
            formDate = "";
        }
    }, [formDeparture, formArrival, formDate]);

    const [currentPage, setCurrentPage] = useState(1);

    
    // {url}/flights?departure={departure}&arrival={arrival}&date={date}

    useEffect(() => {
        // Aquí puedes realizar la llamada a la API para obtener los datos de los vuelos
        // y luego establecer los datos de vuelo en el estado usando setFlights
        fetch(`https://api.nukor.xyz/flights?page=${currentPage}&departure=${formDeparture}&arrival=${formArrival}&date=${formDate}`)
        .then(response => response.json())
        .then(data => {
            setFlights(data.flights);
        });
    }, [currentPage]);


    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Función para ir a la página anterior
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const [displayedDays, setDisplayedDays] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);

    // Función para obtener el rango de días que se mostrarán
    const getDisplayedDays = () => {
        const result = [];
        const currentDate = new Date(selectedDate);

        // Agregar días anteriores
        for (let i = -2; i <= 2; i++) {
            const day = new Date(currentDate);
            day.setDate(day.getDate() + i);
            result.push(day);
        }
        return result;
    };

    // Actualizar los días mostrados cuando cambia la fecha seleccionada o la página actual
    useEffect(() => {
        setDisplayedDays(getDisplayedDays());
    }, [selectedDate, currentPage]);

    // Función para avanzar un día
    const nextDay = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setSelectedDate(nextDate);
    };

    // Función para retroceder un día
    const prevDay = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setSelectedDate(prevDate);
    };

    return (
    <div className='scroll'>
        <div className='secondNavbar'>
            <button> 
                <img src={departure} alt="Logo" className="leftairplane-container"/> {formDeparture}      
                <img src={arrival} alt="Logo" className="rightairplane-container"/> {formArrival}
            </button>
            <span className='separador'></span>
            <button> 
                <img src={dateLogo} alt="Logo" className="date-container"/> {formDate}
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
             {displayedDays.map((day, index) => (
                <>
                    <button key={index} onClick={() => setSelectedDate(day)}>
                        {daysOfWeek[day.getDay()].slice(0, 3)}, {day.getDate()}-{day.getMonth() + 1}
                    </button>
                    <span className='separador'></span>
                </>
                ))}
        </div>
        
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
                        <Link to={`/compra/${flight._id}`}>
                            <button className='buy-ticket'>Comprar pasaje</button>
                        </Link>
                    )}
                </div>
            </div>
            </button>
        ))}
    
    <div className='pagecontainer' style={{ top: `${490 + flights.length * 200}px` }}>
            <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
             <span className='separador'></span>
             <button onClick={nextPage}>Siguiente</button>
    </div>

    </div>
    )
}

export default Ticket;