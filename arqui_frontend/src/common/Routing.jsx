import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from '../landing/Landing'
import Navbar from './Navbar'
import UserLogin from '../user/UserLogin'
import UserSignup from '../user/UserSignup'
import Ticket from '../Tickets/Ticket'
import MisVuelos from '../Tickets/MisVuelos'
import AllTickets from '../Tickets/AllTickets'
import Compra from '../Tickets/Compra'
// import PrivateRoute from "../auth/PrivateRoute"

export default function Routing(){
    
    
    return (
        <>
        
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<><Navbar /><Landing/></>}/>
                <Route path={'/login'} element={<UserLogin />}/>
                <Route path={'/signup'} element={<UserSignup />}/>
                <Route path={'/ticket/flights/:formDeparture/:formArrival/:formDate'} element={<><Navbar /><Ticket /></>}/>
                <Route path={'/tickets'} element={<><Navbar /><AllTickets /></>}/> 
                <Route path={'/misvuelos'} element={<><Navbar /><MisVuelos /></>}/>
                <Route path={'/compra/:flightId'} element={<><Navbar /><Compra /></>}/>
                <Route path={'*'} element={<h1>Page not found</h1>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}