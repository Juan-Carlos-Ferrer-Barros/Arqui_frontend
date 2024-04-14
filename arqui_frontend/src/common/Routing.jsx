import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from '../landing/Landing'
// import App from './App'
import Navbar from './Navbar'
// import { useState, useEffect } from "react"

export default function Routing(){
    
    
    return (
        <>
        <Navbar />
        
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing/>}/>

            </Routes>
        </BrowserRouter>
        </>
    )
}