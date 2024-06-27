import { useState, useEffect } from "react";
import axios from "axios";

function CreateOffer () {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseStatus, setResponseStatus] = useState({});
  const token = localStorage.getItem('token');

  const sendOffer = async (request_id) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auctions/offer/${request_id}`, {
      headers: {
        Authorization: token,
      },
      body: null,
    });
    setResponseStatus(response.status);
    // window.location.reload();
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/requests`, {'headers': {'Authorization': token}})
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching requests:', error);
      });
  }, [])

  return (<>
    {requests.map((request, index) => (
      <button key={index} className={`ticket-container ${selectedRequest === index ? 'selected' : ''}`} onClick={() => setSelectedRequest(index)} style={{ top: `${410 + index * 200}px` }}>
        <h2>Origen: {request.departure_airport}</h2>
        <h2>Destino: {request.arrival_airport}</h2>
        <h2>Hora de salida: {request.departure_time}</h2>
        <h2>Cantidad de asientos: {request.quantity}</h2>
        {selectedRequest === index &&
          <button className='buy-ticket' onClick={() => sendOffer(request.request_id)}>
            Ofrecer tickets
          </button>
        }
      </button>
    ))}
  </>)
}

export default CreateOffer;