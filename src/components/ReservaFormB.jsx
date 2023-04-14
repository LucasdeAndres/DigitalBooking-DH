// Imports
    // Librarys
    import React from 'react'
    import { Link } from 'react-router-dom';
    import { Calendar } from "../components/Calendar";
    // Styles
    import './styles/bloqueCalendarioStyle.css'
    
    const ReservaFormB = ({dateInfo, fechaReservas}) => {
    
        return(
                <div className = 'div_div'>
                    <Calendar inline={true} dateInfo={dateInfo} fechasDeshabilitar={fechaReservas}/>
                </div>
        );
    }
    
    export {ReservaFormB};