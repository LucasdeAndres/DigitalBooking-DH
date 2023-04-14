// Imports
import React from "react";
// Images
import previewCarrusel1 from '../multimedia/previewCarrusel1.jpg'
import previewCarrusel2 from '../multimedia/previewCarrusel2.jpg'
import previewCarrusel3 from '../multimedia/previewCarrusel3.jpg'
// Styles
import './styles/bloqueImagenesStyle.css'

// Component 
const BloqueImagenes = () => {
    return(
        <React.Fragment>
            <div className = "BloqueImagenes_div">
                <img className = "div_img" src = "" alt = "" />
                <img className = "div_img" src = "" alt = "" />
                <div className = "div_div">
                    <img src = {previewCarrusel1} alt = "prewiewCarrusel1" /> 
                    <img src = {previewCarrusel2} alt = "prewiewCarrusel2" /> 
                    <img src = {previewCarrusel3} alt = "prewiewCarrusel3" /> 
                    <img src = "" alt = "" /> 
                    <img src = "" alt = "" /> 
                </div>
            </div>
        </React.Fragment>
    );
}

// Exports
export {BloqueImagenes};