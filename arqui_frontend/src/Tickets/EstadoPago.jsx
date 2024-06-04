import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Compra.css'
import './EstadoPago.css'
import DarkLogo from '../assets/darklogo.png'
import { useLocation } from 'react-router-dom';
import Spinner from '../common/Spinner';
import Check from '../assets/check.png';
import Cross from '../assets/cross.png';


function usePolling(callback, interval) {
    const intervalIdRef = useRef(null);

    useEffect(() => {
      intervalIdRef.current = setInterval(callback, interval);

      return () => clearInterval(intervalIdRef.current);
    }, [callback, interval]);

    const clearPolling = () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };

    return clearPolling;
  }


function Compra() {
    const [webpayToken, setWebpayToken] = useState('');
    const [qToken, setQToken] = useState('');
    const [isResponseLoading, setIsResponseLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const authToken = localStorage.getItem('token');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const token_ws = searchParams.get('token_ws');
        const tbkToken = searchParams.get('TBK_TOKEN');
        if (!token_ws) {
          setIsResponseLoading(false);
          setPaymentStatus('cancelled');
        }
        setWebpayToken(token_ws || tbkToken);
        console.log('Webpay token:', token_ws);
    }, []);

    const clearPolling = usePolling(() => {
        if (webpayToken && isResponseLoading) {
          axios.get(`${import.meta.env.VITE_API_URL}/transaction/${webpayToken}`, {
            headers: {
              'Authorization': `${webpayToken}`
            }
          })
          .then(response => {
            console.log('Transaction status:', response.data);
            if (response.data.transactionStatus.status === 'AUTHORIZED' && response.data.transactionStatus.response_code === 0) {
              console.log('Transaction approved');
              setPaymentStatus('approved');
              clearPolling();
            } else if (response.data.transactionStatus.status === 'FAILED' || response.data.transactionStatus.status === 'REVERSED') {
              console.log('Transaction rejected');
              setPaymentStatus('rejected');
              clearPolling();
            }

            setIsResponseLoading(false);
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
                            <>
                                <div className='status-container'>
                                    <img src={Check} className='status-image' alt='check' />
                                    <div className='info-vuelo'>Pago confirmado</div>
                                    <Link to={'/estadocompras'}><button className='button'>Ver Mis Compras</button></Link>
                                </div>
                            </>
                        )}
                        {(paymentStatus === 'rejected' || paymentStatus === 'cancelled') && (
                            <>
                                <div className='status-container'>
                                    <img src={Cross} className='status-image' alt='cross' />
                                    <div className='info-vuelo'>{paymentStatus === 'rejected' ? 'Pago rechazado' : 'Pago anulado por usuario'}</div>
                                    <Link to={'/'}><button className='button'>Volver al Inicio</button></Link>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Compra;
