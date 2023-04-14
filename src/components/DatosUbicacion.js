// Imports
import React from "react";
// Images
import ubicationIcon from "../multimedia/ubicationIcon.png"
// Styles
import './styles/datosUbicacionStyle.css'

// Component 
const DatosUbicacion = ({object}) => {
    return(
        <React.Fragment>
            <div className = "DatosUbicacion_div">
                <div className = "div_top">
                    <img src = {ubicationIcon} alt = "Ubication Icon" />
                    <p>{object.ubicacion}</p>
                </div>
            </div>
        </React.Fragment>
    );
}

// Exports
export {DatosUbicacion};