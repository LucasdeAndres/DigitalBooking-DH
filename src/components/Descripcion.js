// Imports
import React from "react";
// Styles
import './styles/descripcionStyle.css'

// Component 
const Descripcion = ({object}) => {
    return(
        <React.Fragment>
            <div className = "Descripcion_div">
                <h4>Descripcion</h4>
                <div className = "div_div">
                    <p>{object.descripcion}</p>
                </div>
            </div>
        </React.Fragment>
    );
}

// Exports
export {Descripcion};