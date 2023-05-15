// Imports
    // Librarys
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import { BloqueCalendario } from "../components/BloqueCalendario";
import { BloqueHeader } from "../components/BloqueHeader";
import { Caracteristicas } from "../components/Caracteristicas";
import { DatosUbicacion } from "../components/DatosUbicacion";
import { Descripcion } from "../components/Descripcion";
import { Footer } from "../components/Footer";
import {Header} from "../components/header/Header";
import ImageGallery from "../components/ImageGallery";
import ImageGalleryDesktop from "../components/ImageGalleryDesktop";
import { Politicas } from "../components/Politicas";
import product from "../jsons/product.json"
// Styles
import "../components/styles/imageGalleryDesktop.css"
import "./styles/productStyle.css"

// Component 
const Productos = () => {

    const [data, setData] = useState(null);
    const { id } = useParams();

    console.log(id);
  
    useEffect(() => {
      axios.get(`http://ec2-18-119-10-128.us-east-2.compute.amazonaws.com:8080/productos/${id}`)
        .then(function (response) {
          setData(response.data);
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [id]);

    if (!data) {
        return <div>Cargando...</div>;
      }

      console.log(data);

      
  

    return(
        <React.Fragment>
            <Header />
                <section>
                    <BloqueHeader object={data} ruta={`/`}/>
                    <DatosUbicacion object={data}/>
                    <ImageGalleryDesktop object={data}/>
                    <ImageGallery nameClass={"mobile"} object={data}/>
                    <Descripcion object={data}/>
                    <Caracteristicas object={data}/>
                    <BloqueCalendario object={data}/>   
                    <Politicas data={data}/>
                </section>
            <Footer />
        </React.Fragment>
    )
}

// Export
export {Productos};