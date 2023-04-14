// Imports
    // Librarys
import React, { useContext } from 'react'
import { userContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { Calendar } from "../components/Calendar";
// Styles
import './styles/bloqueCalendarioStyle.css'

const BloqueCalendario = ({object}) => {
    const { userJwt } = useContext(userContext);
    console.log(userJwt)

    console.log(object);

    let arrayFechas = [];

    console.log(object.reservas);

    object.reservas.map((element) => {
        arrayFechas.push({start: new Date(element.fechaDesde + "T00:00:00"), end: new Date(element.fechaHasta + "T00:00:00")})
    })


    
    console.log(arrayFechas);

    return(
        <div className = "BloqueCalendario_div">
            <div className={userJwt == null ? '' : 'disp_none' }>
                <div className = 'block'> 
                    <div>
                        <p>Necesitas estar logueado/a para acceder a las reservas</p>
                        <Link to = "/login"><button className = 'div_button'>Iniciar sesion</button></Link>
                    </div>
                </div>
            </div>
            <h4>Fechas disponibles</h4>
            <div className = 'div_div'>
                <Calendar inline={true} fechasDeshabilitar={arrayFechas}/>
                <div className = 'div_div'>
                    <p>Agregá tus fechas de viaje para obtener precios exactos</p>
                    <Link to={`/reserva/${object.id}`}><button className = 'div_button'>Iniciar reserva</button></Link>
                </div>
            </div>
        </div>
    );
}

export {BloqueCalendario};