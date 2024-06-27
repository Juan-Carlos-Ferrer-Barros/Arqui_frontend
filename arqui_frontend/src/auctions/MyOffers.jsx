import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function MyOffers() {
  const token = localStorage.getItem('token');
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offerProposals, setOfferProposals] = useState([]); 
  const navigate = useNavigate();
  
  const selectOffer = (index, offer_id) => {
    setSelectedOffer(index);
    axios.get(`${import.meta.env.VITE_API_URL}/auctions/${offer_id}/proposals`, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => {
        setOfferProposals(response.data);
      })
      .catch(error => {
        console.error('Error fetching proposals:', error);
      });
  }

  const sendAnswer = (proposal_id, answer) => {
    axios.post(`${import.meta.env.VITE_API_URL}/auctions/answer/${answer}`, {
      headers: {
        Authorization: token,
      },
      body: {
        auction_id: selectOffer.auction_id,
        proposal_id,
      },
    })
      .then(response => {
        console.log('Answer sent:', response);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error sending answer:', error);
      });
  }

  const claim = (proposal_id) => {
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
    axios.get(`${import.meta.env.VITE_API_URL}/auctions/offers/sent`, {
      headers: {
        Authorization: token,
      },
    })
      .then(response => {
        setOffers(response.data);
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
      });
  }, []);

  return (<>
    {offers.length === 0 ? (<div className='title'>No hay ofertas enviadas</div>):''}
    <button onClick={() => navigate('/auctions/create')}>
      Publicar oferta
    </button>
      {offers.map((offer, index) => (
        <button key={index} className={`ticket-container ${selectedOffer === index ? 'selected' : ''}`} onClick={() => selectOffer(index, offer.auction_id)} style={{ top: `${410 + index * 200}px` }}>
          <div className='ticket-distribución'>
              {/* datos de la oferta */}
              <h2>{offer.departure_airport}</h2>
              <h2>{offer.arrival_airport}</h2>
              <h2>{offer.departure_time}</h2>
              <h2>{offer.airline}</h2>
              <h2>{offer.quantity}</h2>
            </div>
            {offer.status === 'accepted' ? (<>
              <h2>Oferta aceptada</h2>
              <button onClick={() => claim(offer.proposal_id)}>Reclamar</button>
            </>
            ) : (
              offer.status === 'pending' ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {selectedOffer === index &&
                    offerProposals.length === 0 ? (
                      <div>No hay propuestas</div>
                    ) : (
                      offerProposals.map((proposal, index) => (
                        <div key={index}>
                          <h2>Propuesta {index + 1}</h2>
                          <h2>Origen: {proposal.departure_airport}</h2>
                          <h2>Destino: {proposal.arrival_airport}</h2>
                          <h2>Hora de salida: {proposal.departure_time}</h2>
                          <h2>Aerolínea: {proposal.airline}</h2>
                          <h2>Cantidad de asientos: {proposal.quantity}</h2>
                          <button onClick={() => sendAnswer(proposal.proposal_id, 'acceptance')}>
                            Aceptar propuesta
                          </button>
                          <button onClick={() => sendAnswer(proposal.proposal_id, 'rejection')}>
                            Rechazar propuesta
                          </button>
                        </div>
                      ))
                    )
                  }
                </div>
              ) : (
                <h2>Oferta rechazada</h2>
              )
            )}
        </button>
      ))
    }
  </>)
}

export default MyOffers;