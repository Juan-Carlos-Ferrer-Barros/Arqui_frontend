import './Ticket.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';




function AllTickets() {

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
    const [selectedFlight, setSelectedFlight] = useState(null);

    
    // {url}/flights?departure={departure}&arrival={arrival}&date={date}

    useEffect(() => {
        // Aquí puedes realizar la llamada a la API para obtener los datos de los vuelos
        // y luego establecer los datos de vuelo en el estado usando setFlights
        fetch(`https://api.nukor.xyz/flights?page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            setFlights(data.flights);
        });
    }, [currentPage]);


    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
    };

    // Función para ir a la página anterior
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
        window.scrollTo(0, 0);
    };

    const [displayedDays, setDisplayedDays] = useState([]);

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
    

    // Función para retroceder un día
    

    return (
    <div className='scroll'>
        <h1 className='titleNoNavbar'>Descubre nuestros vuelos</h1>
        <div className='datecontainerNoNavbar'>
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
            <div key={index} className={`ticket-container ${selectedFlight === index ? 'selected' : ''}`} onClick={() => setSelectedFlight(index)} style={{ top: `${410 + index * 200}px` }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className='tipo'>Directo</p>
                    {selectedFlight === index && (
                        <button className='buy-ticket'>Comprar pasaje</button>
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