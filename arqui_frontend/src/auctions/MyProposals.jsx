import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyProposals() {
  const token = localStorage.getItem('token');
  const [acceptedProposals, setAcceptedProposals] = useState([]);
  const [rejectedProposals, setRejectedProposals] = useState([]);
  const [pendingProposals, setPendingProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const navigate = useNavigate();

  const claimTickets = (proposal_id) => {
    // logica para que se muestre una ventana cargando mientras se envía la solicitud
    axios.post(`${import.meta.env.VITE_API_URL}/auctions/claim/${proposal_id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => {
        console.log('Claim sent:', response);
        navigate('/misvuelos');
      })
      .catch(error => {
        console.error('Error sending claim:', error);
      });
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/sent/proposals`, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => {
        const accepted = response.data.accepted;
        const rejected = response.data.rejected;
        const pending = response.data.pending;
        setAcceptedProposals(accepted);
        setRejectedProposals(rejected);
        setPendingProposals(pending);
      })
      .catch(error => {
        console.error('Error fetching proposals:', error);
      });
  }, []);

  return (<>
    {acceptedProposals.length === 0 ? (
        <div className='title'>No hay propuestas aceptadas</div>
      ): (
        <div>
          <h2>Propuestas aceptadas</h2>
            {acceptedProposals.map((proposal, index) => (
              <button key={index} className={`ticket-container ${selectedProposal === index ? 'selected' : ''}`} onClick={() => setSelectedProposal(index, offer.auction_id)} style={{ top: `${410 + index * 200}px` }}>
                <h3>Origen: {proposal.departure_airport}</h3>
                <h3>Destino: {proposal.arrival_airport}</h3>
                <h3>Hora de salida: {proposal.departure_time}</h3>
                <h3>Aerolínea: {proposal.airline}</h3>
                <h3>Cantidad de asientos: {proposal.quantity}</h3>
                {selectedProposal === index &&
                  <button onClick={() => claimTickets(proposal._id)}>Reclamar tickets</button>
                }
              </button>
            ))}
        </div>
      )}
    {pendingProposals.length === 0 ? (
        <div className='title'>No hay propuestas pendientes</div>
      ): (
        <div>
          <h2>Propuestas pendientes</h2>
            {pendingProposals.map((proposal, index) => (
              <button key={index} className={`ticket-container ${selectedProposal === index ? 'selected' : ''}`} onClick={() => setSelectedProposal(index, offer.auction_id)} style={{ top: `${410 + index * 200}px` }}>
                <h3>Origen: {proposal.departure_airport}</h3>
                <h3>Destino: {proposal.arrival_airport}</h3>
                <h3>Hora de salida: {proposal.departure_time}</h3>
                <h3>Aerolínea: {proposal.airline}</h3>
                <h3>Cantidad de asientos: {proposal.quantity}</h3>
              </button>
            ))}
        </div>
      )}
    {rejectedProposals.length === 0 ? (
        <div className='title'>No hay propuestas rechazadas</div>
      ): (
        <div>
          <h2>Propuestas rechazadas</h2>
            {rejectedProposals.map((proposal, index) => (
              <button key={index} className={`ticket-container ${selectedProposal === index ? 'selected' : ''}`} onClick={() => setSelectedProposal(index, offer.auction_id)} style={{ top: `${410 + index * 200}px` }}>
                <h3>Origen: {proposal.departure_airport}</h3>
                <h3>Destino: {proposal.arrival_airport}</h3>
                <h3>Hora de salida: {proposal.departure_time}</h3>
                <h3>Aerolínea: {proposal.airline}</h3>
                <h3>Cantidad de asientos: {proposal.quantity}</h3>
              </button>
            ))}
        </div>
      )}
  </>)
}

export default MyProposals;