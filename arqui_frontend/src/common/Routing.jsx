import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from '../landing/Landing'
import App from './App'
import Navbar from './Navbar'
import UserLogin from './UserLogin'
import UserSignup from './UserSignup'
import Ticket from './Ticket'
import MisVuelos from './MisVuelos'
import { useState, useEffect } from "react"
import PrivateRoute from "../auth/PrivateRoute"

export default function Routing(){
    
    
    return (
        <>
        
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={'/'} element={<Landing/>}/>
                <Route path={'/login'} element={<UserLogin />}/>
                <Route path={'/signup'} element={<UserSignup />}/>
                {/*<Route path={'/ticket'} element={<Ticket />}/>*/}
                 <Route path={'/ticket/flights/:formDeparture/:formArrival/:formDate'} element={<Ticket />}/>
                 <Route path={'/ticket'} element={<Ticket />}/> 
                {/* <Route path={'/ticket'} element={<Ticket />}/> */}
                <Route path={'/misvuelos'} element={<MisVuelos />}/>
                <Route path={'*'} element={<h1>Page not found</h1>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}