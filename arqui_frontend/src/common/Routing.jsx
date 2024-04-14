import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from '../landing/Landing'
// import App from './App'
import Navbar from './Navbar'
// import { useState, useEffect } from "react"
// import PrivatePage from '../auth/PrivatePage'

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
        <Navbar />
        
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Landing/>}/>
                {/* (a) */}
            </Routes>
        </BrowserRouter>
        </>
    )
}