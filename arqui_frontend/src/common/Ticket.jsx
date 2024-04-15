import './Ticket.css'
import DarkLogo from '../assets/darklogo.png'
import Background from '../assets/background.jpg'
import seat from '../assets/seat.jpg'
import arrival from '../assets/arrival.jpg'
import departure from '../assets/departure.jpg'
import date from '../assets/date.jpg'
import person from '../assets/person.jpg'



function Ticket() {
    return (
    <div>
        <div className='secondNavbar'>
            <button> 
                <img src={departure} alt="Logo" className="leftairplane-container"/> Origen      
                <img src={arrival} alt="Logo" className="rightairplane-container"/> Destino
            </button>
            <span className='separador'></span>
            <button> 
                <img src={date} alt="Logo" className="date-container"/> Fecha
            </button>
            <span className='separador'></span>
            <button> 
                <img src={person} alt="Logo" className="icon-container"/> Cantidad pasajes
            </button>
            <span className='separador'></span>
            <button> 
                <img src={seat} alt="Logo" className="icon-container"/> Economy
            </button>
        </div>
        <h1 className='title'>Elige un vuelo</h1>
        <div className='datecontainer'>
             <span className='separador'></span>
            <button>Fecha -2</button>
            <span className='separador'></span>
            <button>Fecha -1</button>
            <span className='separador'></span>
            <button>Fecha</button>
            <span className='separador'></span>
            <button>Fecha +1</button>
            <span className='separador'></span>
            <button>Fecha +2</button>
            <span className='separador'></span>
        </div>
        
        <div className='ticket-container'>
            <div className='ticket-distribución'>
                <h2>Hora SCL</h2>
                <h3>Duración</h3>
                <h2>Hora CJC</h2>
                <h3>Tarifa desde</h3>
                <p></p>
                <p>2h 10 min</p>
                <p></p>
                <p>CLP 100.000</p>
            </div>
            <hr className='line'/>
            <p className='tipo'>Directo</p>
        </div>
    </div>
    )
}

export default Ticket;