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
                    <a href='/'><img src={DarkLogo} alt="Logo" className="logo-container"/></a>
                    <h2 className="form-title">Ingresa tu usuario</h2>
                    <br></br>
                    <br></br>
                    <form>
                        <div className="form-group">
                    
                            <input type="email" id="email" name="email" placeholder='Email, RUT o Número de socio'required/>
                            <input type="email" id="email" name="email" placeholder='Contraseña' required/>
                        </div>
                        
                        <button className="form-button">Iniciar sesión</button>
                        <a href='/signup'><li className="cuenta-button">Crear cuenta</li></a>
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