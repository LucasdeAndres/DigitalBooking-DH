// Imports
import axios from "axios";
import React, { useEffect, useState } from "react";
// Styles
import './styles/politicasStyle.css'

// Component 
const Politicas = ({data}) => { 

    return(
        <React.Fragment>
            <div className = "Politicas_div">
                <h4>Que tenes que saber</h4>
                <div className = "div_div">
                    <div>
                        <h6>Normas de la casa</h6>
                        <ul>
                            <li>{data.normasCasa}</li>
                        </ul>
                    </div>
                    <div>
                        <h6>Salud y seguridad</h6>
                        <ul>
                            <li>{data.medidasSaludSeguridad}</li>
                        </ul>
                    </div>
                    <div>
                        <h6>Politicas de cancelacion</h6>
                        <ul>
                            <li>{data.politicasCancelacion}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

// Exports
export {Politicas};