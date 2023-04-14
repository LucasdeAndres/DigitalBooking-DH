// Imports
// Librarys
import React, { useContext, useEffect, useState } from 'react';
// Components
import { Header } from '../header/Header';
import { Footer } from '../Footer';
import { userContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

import x from '../../multimedia/icons8-cerrar-ventana-48.png'
// Styles
import './misReservas.css'

// Component
const MisReservas = () => {

    const userContextResult = useContext(userContext);
    const { userJwt } = useContext(userContext);

    const [reservas, setReservas] = useState([])
    const [hotelTitle, setHotelTitle] = useState([])
    const [nameHotel, setNameHotel] = useState("");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userJwt.replace(/['"]+/g, '')}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/reservas/user/${userContextResult.userInfo.id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setReservas(data)
        })
        .catch(error => console.log('error', error));

        fetch(`http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/productos`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setHotelTitle(data)
        })
        .catch(error => console.log('error', error));
    }, [])

    // hotelTitle.forEach(hotel => {
    //     console.log((hotel.titulo).toString())
    //     console.log(hotel.id)
    // })

    // hotelTitle.map(hotel => (console.log(hotel)))
    // reservas.map(reserva => (console.log(reserva)))
    // hotelTitle.map(hotel => (console.log(hotel)))
    console.log(reservas)

    function handleSec(id){
        for(let i = 0; i < reservas.length; i++){
            let idr = reservas[i]
            for(let z = 0; z < hotelTitle.length; z++){
                let idh = hotelTitle[z]
                if(idr.id == idh.id){
                    console.log(idh.titulo)
                }
            }
        }
    }

    return (
        <React.Fragment>
            <Header />
                <div className = 'MisReservas__div'>
                    <h1>Mis reservas</h1>
                </div>
                {console.log(reservas.length == 0)}
                {reservas?.length != 0 ? 
                <section className = 'MisReservas__section'>
                    {reservas.map(reserva => (
                        hotelTitle.map(hotel => (
                            reserva.producto.id == hotel.id && reservas != [] ?
                            <article key = {reserva.id}>
                                <img src={hotel.categoria.urlImagen} alt="" />
                                <h4>{reserva.producto.id == hotel.id ? hotel.titulo : console.error("fallo")}</h4>
                                <p>Check-In: {reserva.fechaDesde}</p>
                                <p>Check-Out: {reserva.fechaHasta}</p>
                                <p>Horario de la reserva: {reserva.horaReserva}</p>
                            </article>
                            : ''
                        ))
                    ))}
                </section>    
                : <div className = 'nanReservas'>
                    <img src = {x} alt="icono de no hay reservas" />
                    <p>Aún no has efectuado ninguna reserva</p>
                    <Link to = '/'>Regresar</Link>
                    </div>} 
                
            <Footer />
        </React.Fragment>
    );
}

// Exports
export {MisReservas};