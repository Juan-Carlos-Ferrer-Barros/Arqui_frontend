import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from '../landing/Landing'
import App from './App'
import Navbar from './Navbar'
import UserLogin from './UserLogin'
import UserSignup from './UserSignup'
import Ticket from './Ticket'
import { useState, useEffect } from "react"

export default function Routing(){
    
    
    return (
        <>
        <Navbar />
        
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing/>}/>
                <Route path={'/login'} element={<UserLogin />}/>
                <Route path={'/signup'} element={<UserSignup />}/>
                <Route path={'/ticket'} element={<Ticket />}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}