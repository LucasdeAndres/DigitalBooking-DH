import React from 'react'
import "./styles/reservaFormDStyle.css"

function ReservaFormD({data, dateInfo}) {


  const [startDate, endDate] = dateInfo;

  let checkIn = startDate ? startDate.toLocaleDateString() : "TBA";
let checkOut = endDate ? endDate.toLocaleDateString() : "TBA";

  return (
    <div className='reservaFormD'>
        <h2>Detalle de la reserva</h2>
        <img src={data.imagenes[0].url} alt="imagen del hotel"/>
        <div>
            <p>{data.categoria.titulo}</p>
            <h3>{data.titulo}</h3>
            <p>{data.ubicacion}</p>
            <hr />
            <div className='divCheckIn'>
                <p>Check-In</p>
                <p>{checkIn}</p>
            </div>
            <hr />
            <div className='divCheckOut'>
                <p>Check-out</p>
                <p>{checkOut}</p>
            </div>
            <hr />
            <button className='button_submit' type='submit'>Confirmar Reserva</button>
        </div>
    </div>
  )
}

export {ReservaFormD}