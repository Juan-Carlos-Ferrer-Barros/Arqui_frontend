import { useState } from 'react'
import Logo from '../assets/logo.png'
import DarkLogo from '../assets/darklogo.png'
import Background from '../assets/background.jpg'
import './User.css'

function UserSignup() {
    return (
    <div>
        <div className = "background">
            <div className = "opacity"></div>
                <img src={Background} alt="Background" className="background-image"/>
            <div className = "form-container">
                <div className = "form">
                    <img src={DarkLogo} alt="Logo" className="logo-container"/>
                    <h2 className="form-title2">Crear usuario</h2>
                    <h3 className='text-container'> Si ya eres parte de flightsUC, no necesitas crear una cuenta nueva. Inicia secsión con tus datos de siempre </h3>
                    <form>
                        <div className="form-group">
                    
                            <input type="name" id="rut" name="rut" placeholder='Número de cédula de identidad'required/>
                            <input type="name" id="name" name="name" placeholder='Nombre(s)'required/>
                            <input type="name" id="apellido" name="apellido" placeholder='Apellidos'required/>
                            
                        </div>
                        <h3 className='form-title2'>Datos de ingreso a tu cuenta</h3>
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder='Email'required/>
                            <input type="email" id="email" name="email" placeholder='Contraseña' required/>
                        </div>
                        
                        <button className="form-button">Crear cuenta</button>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}


    


export default UserSignup;