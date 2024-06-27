import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Compra.css'
import DarkLogo from '../assets/darklogo.png'
import Arrow from '../assets/arrow.png'
import sendAuthRequest from '../auth/authRequest';
import { useNavigate } from 'react-router-dom';
import webpayImage from '../assets/webpay.png';
import Spinner from '../common/Spinner';


function CompraOferta() {
    const { requestId } = useParams(); // Suponiendo que flightId es el parámetro que identifica el vuelo seleccionado
    const [flightInfo, setFlightInfo] = useState(null);
    const [cantidadPasajes, setCantidadPasajes] = useState(1);
    const [showButton, setShowButton] = useState(false);
    const [webpayUrl, setWebpayUrl] = useState('');
    const [webpayToken, setWebpayToken] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const newValue = event.target.value;
        if (newValue >= 1 && newValue <= 4) {
            setCantidadPasajes(newValue);
        }
        else if (newValue < 1) {
            setCantidadPasajes(1);
        }
        else if (newValue > 4) {
            setCantidadPasajes(4);
        }
    }



    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/reservation/${requestId}`)
            .then(response => {
                setFlightInfo(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching flight information:', error);
            });
    }, [requestId]);

    const realizarCompra = async () => {
        const datosCompra = {
            user_id: userId,
            request_id: requestId,
        };

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/reservation`, {
            headers: {
                Authorization: token,
            },
            body: datosCompra,
        });
            console.log(response.data.transaction_token)
            setWebpayUrl(response.data.payment_url);
            setWebpayToken(response.data.transaction_token);
            console.log("RESPONSE: ", response);
            setShowButton(true);
        }

    const sendToWebpay = async () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = webpayUrl;
        form.target = '_blank';
        const data = {
            "token_ws": webpayToken,
        };

        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = "token_ws";
        tokenInput.value = webpayToken;
        form.appendChild(tokenInput);

        const submitAction = document.createElement('input');
        submitAction.type = 'submit';
        submitAction.value = 'Pagar con Webpay';
        form.appendChild(submitAction);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }

    return (
        <div className='background-compra'>
                {flightInfo ? (
                    <div className='informacion-compra'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <a href='/'><img src={DarkLogo} alt="Logo" className="logo-container"/></a>
                            <img src={flightInfo.airlineLogo} className='logo-aerolinea'></img>
                        </div>
                        <div className='detalle'>Detalle de compra</div>
                        <hr className="line"/>
                            <div className='info-vuelo'>De {flightInfo.departure_airport_name} a {flightInfo.arrival_airport_name}</div>
                            <div className='info-text'>{flightInfo.departure_airport_id} {flightInfo.departure_time.slice(11,16)} <img src={Arrow} alt="Logo" className="arrow-container" ></img> {flightInfo.arrival_airport_id} {flightInfo.arrival_time.split(' ')[1]} </div>
                            <div className='info-text-small'>{flightInfo.duration} minutos</div>
                            <hr className="line"/>
                            {/* HASTA ACA BIEN */}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className='informacion-flex-left'>
                                    <div className='informacion-flex-left-text'>Vuelo operado por {flightInfo.airline}</div>
                                    <div className='informacion-flex-left-text'>Costo por pasaje CLP {flightInfo.price} </div>
                                    <div className='informacion-flex-left-text'>Cantidad disponible de asientos {flightInfo.available_seats} </div>
                                </div>
                                <div className='informacion-flex-right'>
                                    <div className='informacion-flex-right-text'>------------------------- Compra de pasajes -------------------------</div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <div className='informacion-flex-left-text'>Selecciona la cantidad de pasajes </div>
                                        <input className= 'cantidad-pasajes' type='number' min='1' max="4" value={cantidadPasajes} onChange={handleChange} />
                                    </div>
                                    <div className='informacion-flex-left-text'>Total a pagar: </div> <div className='precio'> CLP {flightInfo.price * cantidadPasajes} </div>
                                </div>
                            </div>

                        {showButton ? (
                            <>
                                <h1 className='notice'>Complete su compra a través de Webpay:</h1>
                                <img className='logo' src={webpayImage} alt='Webpay logo' />
                                <button className='comprar-pasaje' onClick={() => sendToWebpay()}>Pagar con Webpay</button>
                            </>
                        ) : <button className='comprar-pasaje' onClick={() => realizarCompra()}>Confirmar compra</button>}
                    </div>
            ) : (
                <p>Cargando información del vuelo...</p>
            )}
        </div>
    )
}

export default CompraOferta;
