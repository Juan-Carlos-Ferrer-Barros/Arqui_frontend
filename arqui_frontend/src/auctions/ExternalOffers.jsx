import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

function ExternalOffers() {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const navigate = useNavigate();

  const initAuction = (id) => {
    navigate(`/auctions/offers/${id}`);
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/auctions`)
      .then(response => {
        console.log('API Response:', response);
        if (response.data && Array.isArray(response.data.auctions)) {
          setOffers(response.data.auctions);
          console.log('Ofertas:', response.data.auctions);
          console.log('Ofertas:', offers);
          console.log('Largo Ofertas:', offers.length);
        } else {
          console.error('La respuesta de la API no contiene un array de ofertas:', response.data);
          setOffers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
      });
  }, []);

  return (
    <div>
      {offers.length === 0 ? (
        <div className='title'>No hay ofertas publicadas</div>
      ) : (
        offers.map((offer, index) => (
          <button key={index} className={`ticket-container ${selectedOffer === index ? 'selected' : ''}`} onClick={() => setSelectedOffer(index)} style={{ top: `${410 + index * 200}px` }}>
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
                <button className='buy-ticket' onClick={() => initAuction(offer.auction_id)}>Proponer intercambio</button>
              }
            </div>
          </button>
        ))
      )}
    </div>
  );
}

export default ExternalOffers;
