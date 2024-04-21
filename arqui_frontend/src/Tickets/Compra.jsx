import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Compra.css'

function Compra() {
    const { flightId } = useParams(); // Suponiendo que flightId es el parámetro que identifica el vuelo seleccionado
    const [flightInfo, setFlightInfo] = useState(null);
    const [cantidadAsientos, setCantidadAsientos] = useState(1);

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
        // Supongamos que tienes el ID del vuelo en flightId y la cantidad de asientos en una variable llamada cantidadAsientos
        const datosCompra = {
            flightId: flightId,
            quantity: cantidadAsientos
        };
    
        // Realizar la solicitud POST a la API con los datos de la compra
        axios.post(`https://api.nukor.xyz/request`, datosCompra)
            .then(response => {
                // Manejar la respuesta si es necesario
                console.log('Compra realizada con éxito:', response.data);
            })
            .catch(error => {
                console.error('Error al realizar la compra:', error);
            });
    };

    return (
        <div className='background-compra'>
            <div className='opacity'></div>
                {flightInfo ? (
                    <div className='informacion-compra'>
                        <h1>Detalles del vuelo</h1>
                        <h1>Salida: {flightInfo.departure_time}</h1>
                        <h1>Llegada: {flightInfo.arrival_time}</h1>
                        <h1>Duración: {flightInfo.duration} minutos</h1>
                        <h1>Tarifa: CLP {flightInfo.price}</h1>
                        <h1>Cantidad Asientos disponibles: {flightInfo.available_seats}</h1>
                        {/* Agrega aquí cualquier otra información que desees mostrar */}
                    </div>
            ) : (
                <p>Cargando información del vuelo...</p>
            )}

            <button onClick={() => realizarCompra()}>Comprar!!</button>
        </div>
    );
}

export default Compra;
