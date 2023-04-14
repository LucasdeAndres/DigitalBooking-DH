import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../components/styles/imageGallery.css"


function ImageGallery({nameClass, object}) {


  return (
    <Carousel className={nameClass} showThumbs={false} autoPlay infiniteLoop showArrows={false}>   
                {object.imagenes.map((object) => (
                    <div><img src={object.url}/></div>
                ))}
    </Carousel>
  )
}

export default ImageGallery
  