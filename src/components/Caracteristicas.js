// Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faWifi, 
    faTv, 
    faShrimp,
    faKitchenSet,
    faSquareParking,
    faUmbrellaBeach,
    faShower,
    faBed,
    faSuitcase,
    faClock 
  } from '@fortawesome/free-solid-svg-icons';
import React from "react";
// Styles
import './styles/caracteristicasStyle.css'
// Component 
const Caracteristicas = ({object}) => {

    
    

    const arrayChar = object.caracteristicas.map(object => {
        let icon = null;
    
        if (object.caracteristicaNombre === "Wifi") {
            icon = <FontAwesomeIcon icon={faWifi} />;
        } else if (object.caracteristicaNombre === "Televisión") {
            icon = <FontAwesomeIcon icon={faTv} />;
        } else if (object.caracteristicaNombre === "Frente a la costa"){
            icon = <FontAwesomeIcon icon={faShrimp} />;
        } else if (object.caracteristicaNombre === "Cocina"){
            icon = <FontAwesomeIcon icon={faKitchenSet} />;
        } else if (object.caracteristicaNombre === "Estacionamiento gratis en la propiedad"){
            icon = <FontAwesomeIcon icon={faSquareParking} />;
        } else if (object.caracteristicaNombre === "Acceso a la playa - Frente a la playa"){
            icon = <FontAwesomeIcon icon={faUmbrellaBeach} />;
        } else if (object.caracteristicaNombre === "Shampoo"){
            icon = <FontAwesomeIcon icon={faShower} />;
        } else if (object.caracteristicaNombre === "Servicios básicos"){
            icon = <FontAwesomeIcon icon={faBed} />;
        } else if (object.caracteristicaNombre === "Zona de trabajo"){
            icon = <FontAwesomeIcon icon={faSuitcase} />;
        } else if (object.caracteristicaNombre === "Check-in sin restricción de horario"){
            icon = <FontAwesomeIcon icon={faClock} />;
        }
    
        return {
            nombre: object.caracteristicaNombre,
            icon: icon
        }
    });
    

    console.log(arrayChar);

    return(
        <React.Fragment>
            <div className = "Caracteristicas_div"> 
                <h4>¿Que ofrece este lugar?</h4>
                <div className = "div_div">
                    {arrayChar.map(objeto => (
                                            <div className="iconos">
                                             {objeto.icon} 
                                            <p>{objeto.nombre}</p>
                                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

// Exports
export {Caracteristicas};