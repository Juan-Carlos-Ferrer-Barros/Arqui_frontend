import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from '../landing/Landing'
import Navbar from './Navbar'
import UserLogin from '../user/UserLogin'
import UserSignup from '../user/UserSignup'
import Ticket from '../Tickets/Ticket'
import MisVuelos from '../Tickets/MisVuelos'
import AllTickets from '../Tickets/AllTickets'
import Compra from '../Tickets/Compra'
import EstadoCompras from "../Tickets/EstadoCompra"
import PrivateRoute from "../auth/PrivateRoute"
import Recommendations from "../Tickets/Recommendations"
import EstadoPago from "../Tickets/EstadoPago"
import Ofertas from "../Tickets/Ofertas"
import CompraOferta from "../Tickets/CompraOferta"
import ExternalOffers from "../auctions/ExternalOffers"


export default function Routing(){


    return (
        <>

        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={'/'} element={<Landing/>}/>
                <Route path={'/login'} element={<UserLogin />}/>
                <Route path={'/signup'} element={<UserSignup />}/>
                <Route path={'/ticket/flights/:formDeparture/:formArrival/:formDate'} element={<Ticket />}/>
                <Route path={'/tickets'} element={<AllTickets />}/>
                <Route path={'/ofertas'} element={<Ofertas />}/>
                <Route path={'/compraoferta/:requestId'} element={<CompraOferta />}/>
                <Route path={'/auctions/offers'} element={<ExternalOffers />}/>
                {/* <Route path={'/misvuelos'} element={<><Navbar /><MisVuelos /></>}/> */}
                {/* PrivateRoute es una ruta que solo se accede si esta loggeado */}
                {/* <Route path={'/misvuelos'} element={<PrivateRoute element={<><Navbar /><MisVuelos /></>} />}/> */}
                <Route path={'/misvuelos'} element={
                    <PrivateRoute element={MisVuelos} />
                }/>
                <Route path={'/estadocompras'} element={
                    <PrivateRoute element={EstadoCompras} />
                }/>
                <Route path={'/compra/:flightId'} element={<Compra />}/>
                <Route path={'/recomendaciones'} element={
                    <PrivateRoute element={Recommendations} />
                }/>
                <Route path={'/transaction'} element={
                    <EstadoPago />
                }/>
                <Route path={'*'} element={<h1>Page not found</h1>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}