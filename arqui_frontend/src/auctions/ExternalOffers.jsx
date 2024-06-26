import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext'

function ExternalOffers() {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const navigate = useNavigate();

  const initAuction = (offer) => {
    navigate(`/auctions/offers/${offer.id}`);
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/auctions/offers`)
      .then(response => {
        setOffers(response.data);
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
      });
  }, []);

  return (<>
    <div className='scroll'>
      {offers.map((offer, index) => (
        <button key={index} className={`ticket-container ${selectedFlight === index ? 'selected' : ''}`} onClick={() => setSelectedOffer(index)} style={{ top: `${410 + index * 200}px` }}>
          <div className='ticket-distribución'>
            {/* datos de la oferta */}
            <h2>{offer.departure_airport}</h2>
            <h2>{offer.arrival_airport}</h2>
            <h2>{offer.departure_time}</h2>
            <h2>{offer.airline}</h2>
            <h2>{offer.quantity}</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {selectedOffer === index &&
              <button className='buy-ticket' onClick={() => initAuction(offer)}>Proponer intercambio</button>
            }
          </div>
        </button>
      
      ))}
    </div>
  </>)
}

export default ExternalOffers;