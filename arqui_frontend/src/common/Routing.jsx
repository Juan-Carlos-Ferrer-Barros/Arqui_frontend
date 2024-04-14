import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from '../landing/Landing'
// import App from './App'
import Navbar from './Navbar'
// import { useState, useEffect } from "react"
// import PrivatePage from '../auth/PrivatePage'
import Login from '../pages/Login'
import Register from '../pages/Register'

/*
Para hacer páginas privadas que sólo se puede llegar logueado,
se hace así, donde Componente es la página que se quiere proteger:
<PrivatePage component={Componente} />

En (a) sería:
<Route path={"{path}"} element={<PrivatePage component={Componente} />} />
*/

export default function Routing(){
    return (
        <>
        
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path={"/"} element={<Landing />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<Register />} />
                {/* (a) */}
            </Routes>
        </BrowserRouter>
        </>
    )
}