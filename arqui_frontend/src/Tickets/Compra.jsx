import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Compra.css'
import DarkLogo from '../assets/darklogo.png' 
import Arrow from '../assets/arrow.png'
import sendAuthRequest from '../auth/authRequest';

function Compra() {
    const { flightId } = useParams(); // Suponiendo que flightId es el parámetro que identifica el vuelo seleccionado
    const [flightInfo, setFlightInfo] = useState(null);
    const [cantidadPasajes, setCantidadPasajes] = useState(1);
    const token = localStorage.getItem('token');

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
        // Realizar la llamada a la API para obtener la información del vuelo seleccionado
        axios.get(`https://api.nukor.xyz/flights/${flightId}`)
            .then(response => {
                setFlightInfo(response.data); // Suponiendo que la respuesta contiene la información del vuelo
            })
            .catch(error => {
                console.error('Error fetching flight information:', error);
            });
    }, [flightId]);   

    const realizarCompra = () => {
        const datosCompra = {
            flight_id: flightId,
            quantity: cantidadPasajes
        };

        console.log(datosCompra);

        sendAuthRequest('POST', 'https://api.nukor.xyz/request', token, datosCompra);
    
        // Realizar la solicitud POST a la API con los datos de la compra
        
    };

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
                        
                        
                        <button className='comprar-pasaje' onClick={() => realizarCompra()}>Confirmar compra</button>
                        {/* Agrega aquí cualquier otra información que desees mostrar */}
                    </div>
            ) : (
                <p>Cargando información del vuelo...</p>
            )}

            
        </div>
    );
}

export default Compra;
