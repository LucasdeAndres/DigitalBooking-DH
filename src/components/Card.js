import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";

import "./styles/cardStyle.css"
import { Link } from "react-router-dom";

const Card = ({object}) => {

  const [showFullDescription, setShowFullDescription] = useState(false)

  function handleShowMoreClick() {
    setShowFullDescription(true);
  }

  

  
    
    return (
        <div className='card'>
          <div className='cardImages'>
            <img src={typeof object.imagenes[0] === "undefined" ? "https://i.etsystatic.com/27485089/r/il/b594e8/2826647276/il_fullxfull.2826647276_bxss.jpg" : object.imagenes[0].url } alt="description (placeholder)" />
          </div>
          <div className='cardText'>
            <div className='cardHeader'>
              <h3>{object.categoria.titulo}</h3>
              <h2>{object.titulo}</h2>
            </div>
            <div className='cardBody'>
              <FontAwesomeIcon  className='cardLocationDot' icon={faLocationDot} />
              <p>{object.ubicacion}</p>
            </div>
            <div className='cardFooter'>
                <p>{object.descripcion}</p>
                <Link to={`/productos/${object.id}`}><Button nameClass={"verMas"} text={"Ver mas"} /></Link>
            </div>
          </div>
        </div>
      )
}

export { Card };