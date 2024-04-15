import { useState } from 'react'
import Logo from '../assets/logo.png'
import DarkLogo from '../assets/darklogo.png'
import Background from '../assets/background.jpg'
import './User.css'

function UserLogin() {
    return (
    <div>
        <div className = "background">
            <div className = "opacity"></div>
                <img src={Background} alt="Background" className="background-image"/>
            <div className = "form-container">
                <div className = "form">
                    <img src={DarkLogo} alt="Logo" className="logo-container"/>
                    <h2 className="form-title">Ingresa tu usuario</h2>
                    <form>
                        <div className="form-group">
                    
                            <input type="email" id="email" name="email" placeholder='Email, RUT o Número de socio'required/>
                            <input type="email" id="email" name="email" placeholder='Contraseña' required/>
                        </div>
                        
                        <button className="form-button">Iniciar sesión</button>
                        <li className="cuenta-button">Crear cuenta</li>
                        <hr className="line"/>
                        <h3> ¿No puedes ingresar a tu cuenta? Recupera el acceso</h3>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}


    


export default UserLogin;