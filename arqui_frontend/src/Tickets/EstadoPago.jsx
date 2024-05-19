import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Compra.css'
import DarkLogo from '../assets/darklogo.png'
import Arrow from '../assets/arrow.png'
import { useLocation } from 'react-router-dom';
import Spinner from '../common/Spinner';


function usePolling(callback, interval) {
    useEffect(() => {
      const pollingInterval = setInterval(callback, interval);
      return () => clearInterval(pollingInterval);
    }, [callback, interval]);
}


function Compra() {
    const [showButton, setShowButton] = useState(false);
    const [webpayToken, setWebpayToken] = useState('');
    const [isResponseLoading, setIsResponseLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState('pending'); // ['pending', 'approved', 'rejected'
    const authToken = localStorage.getItem('token');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const token_ws = searchParams.get('token_ws');
        if (token_ws) {
            setWebpayToken(token_ws);
            console.log('Webpay token:', token_ws);
        }
    }, []);

    usePolling(() => {
        if (webpayToken) {
          axios.get(`https://api.nukor.xyz/transactions/${webpayToken}`, {
            headers: {
              'Authorization': `Bearer ${webpayToken}`
            }
          })
          .then(response => {
            if (response.data.status === 'approved') {
              console.log('Transaction approved');
              // Perform further actions here if needed
            }
          })
          .catch(error => {
            console.error('Error checking transaction status:', error);
          });
        }
    }, 5000);

    return (
        <div className='background-compra'>
            <div className='informacion-compra' style={{ marginTop: '12rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to={'/'}><img src={DarkLogo} alt="Logo" className="logo-container"/></Link>
                </div>
                {isResponseLoading ? (
                    <div className='detalle'>Esperando validación de transacción... <Spinner /></div>
                ) : (
                    <>
                        <hr className="line"/>
                        {paymentStatus === 'approved' && (
                            <div className='info-vuelo'>Pago confirmado</div>
                        )}
                        {paymentStatus === 'rejected' && (
                            <div className='info-vuelo'>Pago rechazado</div>
                        )}
                        {/* <div className='info-text'> <img src={Arrow} alt="Logo" className="arrow-container" ></img>  </div>
                        <div className='info-text-small'>minutos</div>
                        <hr className="line"/> */}
                    </>
                )}
            </div>
        </div>
    );
}

export default Compra;
