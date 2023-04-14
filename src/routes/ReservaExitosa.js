// Imports
    // Librarys
    import axios from "axios";
    import React, { useEffect, useState } from "react";
    import { Link, useParams } from "react-router-dom";
    import { Footer } from "../components/Footer";
    import { Header } from "../components/header/Header";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
    // Styles
    import "./styles/reservaExitosaStyle.css"
    
    // Component 
    const ReservaExitosa = () => {
    
    
        return(
            <React.Fragment>
                <Header />
                    <section className="reservaExitosa_section">
                        <div className="reservaExitosa">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <h1>Muchas Gracias</h1>
                            <p>Su reserva fue realizada con exito</p>
                            <Link to={"/"}><button>ok</button></Link>
                        </div>
                    </section>    
                <Footer />
            </React.Fragment>
        )
    }
    
    // Export
    export {ReservaExitosa};