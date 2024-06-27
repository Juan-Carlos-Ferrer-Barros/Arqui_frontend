import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function CreateProposal() {
  const [reservations, setReservations] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { offerId } = useParams();
  const [offer, setOffer] = useState({}); // [departure_airport, arrival_airport, departure_time, airline, quantity
  const token = localStorage.getItem('token');
  const [responseStatus, setResponseStatus] = useState({});

  const createProposal = async (request_id) => {
    console.log(token);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auctions/proposal/${offerId}/${request_id}`, {
      headers: {
        Authorization: token,
      },
      body: null,
    });
    setResponseStatus(response.status);
    // window.location.reload();
  }

  const selectFlight = (index, quantity) => {
    setSelectedFlight(index);
    setQuantity(quantity);
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/reservations`)
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservation:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/auctions/${offerId}`)
      .then(response => {
        setOffer(response.data);
      })
      .catch(error => {
        console.error('Error fetching offer:', error);
      });
  }, []);

  return (<>
  <div className='informacion-compra'>
    <h2>Oferta de vuelo</h2>
    <h2>Origen: {offer.departure_airport}</h2>
    <h2>Destino: {offer.arrival_airport}</h2>
    <h2>Hora de salida: {offer.departure_time}</h2>
    <h2>Aerolínea: {offer.airline}</h2>
    <h2>Cantidad de asientos: {offer.quantity}</h2>
    <h2>Seleccione la reserva a intercambiar</h2>
    {responseStatus === 200 && <h2>Propuesta enviada exitosamente</h2>}
  </div>
    <div className='scroll'>
      {reservations.map((reservation, index) => (
        <button key={index} className={`ticket-container ${selectedFlight === index ? 'selected' : ''}`} onClick={() => selectFlight(index, reservation.quantity)} style={{ top: `${410 + index * 200}px` }}>
          <div className='ticket-distribución'>
            {/* datos de la reserva */}
            <h2>{reservation.departure_airport}</h2>
            <h2>{reservation.arrival_airport}</h2>
            <h2>{reservation.departure_time}</h2>
            <h2>{reservation.airline}</h2>
            <h2>{reservation.quantity}</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {selectedFlight === index &&
              <button className='buy-ticket' onClick={() => createProposal(reservation._id)}>Proponer intercambio</button>
            }
          </div>
        </button>
      ))}
    </div>
  </>)
}

export default CreateProposal;