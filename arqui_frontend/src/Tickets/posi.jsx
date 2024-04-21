<a href='/'><img src={DarkLogo} alt="Logo" className="logo-container"/></a>
                            <img src={flightInfo.airlineLogo} className='logo-aerolinea'></img>
                        
                    <div className='informacion-compra'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <a href='/'><img src={DarkLogo} alt="Logo" className="logo-container"/></a>
                            <img src={flightInfo.airlineLogo} className='logo-aerolinea'></img>
                        </div>
                        <h2>Detalles del vuelo</h2>
                        <div className='info-vuelo'> De {flightInfo.departure_airport_name} a {flightInfo.arrival_airport_name} </div>
                                <h4>{flightInfo.departure_airport_id} {flightInfo.departure_time.slice(11,16)} a {flightInfo.arrival_airport_id} {flightInfo.arrival_time.split(' ')[1]}</h4>
                                <h4>Duración del vuelo {flightInfo.duration} minutos</h4>
                                <h4>Vuelo operado por {flightInfo.airline}</h4>
                            
                            
                                <h4>Compra de pasajes</h4>
                                <h4>Cantidad de pasajes <input></input></h4>
                                <h4>Cantidad disponible de asientos {flightInfo.available_seats} </h4>
                                <h4>Costo por pasaje CLP {flightInfo.price} </h4>
                                <h4>Total a pagar CLP {flightInfo.price * cantidadPasajes} </h4>
                           
                        
                        
                        <button onClick={() => realizarCompra()}>Comprar!!</button>
                        {/* Agrega aquí cualquier otra información que desees mostrar */}
                    </div>
                    <div className='informacion-compra'> <h1>Comprar pasaje</h1> </div>