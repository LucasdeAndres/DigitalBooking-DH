import React, { useState } from 'react'
import "./styles/imageGalleryDesktop.css"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageGalleryDesktop({object}) {

    let newArr = [];

    for (let i = 0; i < 5; i++) {
        newArr.push(object.imagenes[i])
      } 


      let id = "image div_0"

      const [show, setShow] = useState ("")

      const addShow = () => {
        setShow("show");
      }

      const removeShow = () => {
        setShow("");
      }

      const [noShow, setNoShow] = useState ("");

      const addNoShow = () => {
        setNoShow("noShow");
      }

      const removeNoShow = () => {
        setNoShow("");
      }

      

  return (
    <div className='imageGalleryDesk'>
        {newArr.map((e) => (
            typeof e === "undefined" ? e = { url : "https://i.etsystatic.com/27485089/r/il/b594e8/2826647276/il_fullxfull.2826647276_bxss.jpg"} : e,
            id = id + 1,
            <div className={id}><img src={e.url} /></div>
        ))}
        <button className={"verMas" + " " + noShow} onClick={() => {addShow(); addNoShow();}}>Ver mas...</button>
        <div className={"overlay_gallery" + " " + show}>
            <Carousel className="carouselDesktop" autoPlay infiniteLoop showThumbs={false}>   
                    {object.imagenes.map((object) => (
                        <div><img src={object.url}/></div>
                    ))}
            </Carousel>
            <button className={"x"+ " " + show} onClick={() => {removeShow(); removeNoShow();}}>X</button>
        </div>
    </div>
  )
}

export default ImageGalleryDesktop