import React from 'react'
import "./styles/reservaFormCStyle.css"
import horas from "../jsons/horas.json"

export function ReservaFormC({handleOnChange}) {
  return (
    <div className='reservaFormC'>
        <h4>Tu habitacion va a estar lista para el Check-in entre las 10:00 AM y 11:00 PM</h4>
        <p>Indica tu horario estimado de llegada</p>
        
        <select name='horaReserva' onChange={handleOnChange} className="horaReserva">
        <option value="" disabled selected> Seleccionar Hora </option>
            {horas.map(object => {
                return <option id={object.label} value={object.value}>{object.label}</option>
            })}
        </select>
    </div>    
  )
}
