// Imports 
    // Librarys
    import React, { useCallback, useEffect, useState } from "react";
    import axios from "axios";
    // Components
import {Footer} from "../components/Footer";
import {Header} from "../components/header/Header";
import {Category} from "../components/Category";
import {Searcher} from "../components/Searcher";
import {Card} from "../components/Card";
import when from 'when';

    // Styles
import './styles/homeStyle.css'

// Component
const Home = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/home")
    .then( res => setList(res.data))
    .catch(error => {
        console.error('Error fetching home data:', error);
      });
    },[])

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/categorias")
        .then( res => setCategory(res.data))
        .catch(error => {
            console.error('Error fetching categorias data:', error);
          });
    },[])

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get("http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/productos")
    .then( res => setProductos(res.data))
    .catch(error => {
        console.error('Error fetching productos data:', error);
      });
    },[])

    const [ciudad, setCiudad] = useState("");

    const handleCiudad = (info) => {
        setCiudad(info)
    }

    const [keyword, setKeyword] = useState("");

    const handleKeywordChange = (newKeyword) => {
        setKeyword(newKeyword);
      };

    const [date, setDate] = useState([]);

    const handleDate = (date) => {
      const [startDate, endDate] = date;
    
      let formattedDate = startDate ? `${date[0].getFullYear()}-${(date[0].getMonth() + 1).toString().padStart(2, '0')}-${date[0].getDate().toString().padStart(2, '0')}` : "";
      let formattedEndDate = endDate ? `${date[1].getFullYear()}-${(date[1].getMonth() + 1).toString().padStart(2, '0')}-${date[1].getDate().toString().padStart(2, '0')}` : "";
    
      setDate(date);
    
      setDatosBusqueda({
        ...datosBusqueda,
        fechaDesde: formattedDate,
        fechaHasta: formattedEndDate
      });
    }

    const [datosBusqueda, setDatosBusqueda] = useState({
        fechaDesde: '',
        fechaHasta: '',
      });

      console.log(datosBusqueda);

      const [fechasYCiudad, setFechasYCiudad] = useState([]);

      const [loaded, setLoaded] = useState(false);

      useEffect(() => {
        const fetchData = async () => {
          if (datosBusqueda.fechaDesde !== '' && datosBusqueda.fechaHasta !== '' && ciudad !== "") {
            try {
              const response = await axios.get(`http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/productos/ciudad/${ciudad}/${datosBusqueda.fechaDesde}/${datosBusqueda.fechaHasta}`);
              setFechasYCiudad(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
        };
      
        fetchData();
      }, [datosBusqueda, ciudad]);
      
      

      console.log(ciudad);

      const [dataCiudad, setDataCiudad] = useState([]);

      useEffect(() => {
        const getData = async () => {
          if (ciudad !== "") {
            try {
              const res = await axios.get(`http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/productos/ciudad/${ciudad}`);
              setDataCiudad(res.data);
            } catch (error) {
              console.error('Error fetching ciudad data:', error);
            }
          }
        };
        getData();
      }, [ciudad]);
      

      const [fechas, setFechas] = useState([]);

      useEffect(() => {
        const fetchData = async () => {
          if (datosBusqueda.fechaDesde !== '' && datosBusqueda.fechaHasta !== ''&& ciudad === "") {
            try {
              const res = await axios.get(`http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/productos/${datosBusqueda.fechaDesde}/${datosBusqueda.fechaHasta}`);
              setFechas(res.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
        }
        fetchData();
      },[datosBusqueda]);
      

      console.log(fechas);

    console.log(dataCiudad);

      console.log(fechasYCiudad);

      console.log(fechasYCiudad.length);

      console.log(fechas.length);


      useEffect(() => {
        if(ciudad === "" && fechas.length === 0 && datosBusqueda.fechaHasta === ""){
            setLoaded(false)
        }else if (ciudad !== "" && fechas.length === 0 && datosBusqueda.fechaHasta === ""){
            setLoaded(false)
        }else if (ciudad === "" && fechas.lenght > 0){
            setLoaded(false)
        }else if (ciudad !== "" && fechas.length > 0){
            setLoaded(false)
        }else if (fechas.length === 0 && fechasYCiudad.length === 0){
            setLoaded(true)
        }else if (fechasYCiudad.length > 0){
            setLoaded(false)
        }else if (fechas.length === 0 && ciudad === ""){
            setLoaded(true)
        }else {
            setLoaded(false)
        }
      }, [datosBusqueda, ciudad, fechasYCiudad.length, fechas.length])

      useEffect(() => {
        if (keyword === "Busqueda" && ciudad === '' && fechasYCiudad.length === 0 && fechas.length === 0) {
            setKeyword("Default")
            
          } else if (keyword === "Busqueda" && ciudad !== '' && fechas.length === 0 && fechasYCiudad.length === 0) {
            setKeyword("Ciudad")

          } else if (keyword === "Busqueda" && ciudad === '' && fechas.length > 0) {
            setKeyword("Fechas")
          } else if (keyword === "Busqueda" && ciudad !== '' && fechasYCiudad.length > 0) {
            setKeyword("fechasCiudad")
          } else {
            console.log(keyword);
          }
      }, [keyword, fechas, fechasYCiudad, ciudad])

      const filteredDataHotel = productos.filter((item) => item.categoria.titulo === "Hotel");
      const filteredDataHostel = productos.filter((item) => item.categoria.titulo === "Hostel");
      const filteredDataBaB = productos.filter((item) => item.categoria.titulo === "Bed & Breakfast");
      const filteredDataDepartamentos = productos.filter((item) => item.categoria.titulo === "Departamento");

      console.log(keyword);

      console.log(filteredDataBaB);

      function renderCard() {
        switch (keyword) {
          case 'Hotel':
            return      <div className="recomendations">
                            <h2 className = "recomendationsH2">Todos los hoteles</h2>
                            <div className='recomendations_container'>
                                {filteredDataHotel.map((object) => (
                                    <Card key={object.id} object={object}/>
                                ))}
                            </div>
                        </div>   
          case 'Departamento':
            return      <div className="recomendations">
                            <h2 className = "recomendationsH2">Todos los departamentos</h2>
                            <div className='recomendations_container'>
                                {filteredDataDepartamentos.map((object) => (
                                    <Card key={object.id} object={object}/>
                                ))}
                            </div>
                        </div>   
          case 'Hostel':
            return      <div className="recomendations">
                            <h2 className = "recomendationsH2">Todos los hostels</h2>
                            <div className='recomendations_container'>
                                {filteredDataHostel.map((object) => (
                                    <Card key={object.id} object={object}/>
                                ))}
                            </div>
                        </div>   
          case 'Bed & Breakfast':
            return      <div className="recomendations">
                            <h2 className = "recomendationsH2">Todos los Bed & Breakfast</h2>
                            <div className='recomendations_container'>
                                {filteredDataBaB.map((object) => {
                                  if (object.imagenes.length === 0) {
                                    console.log(object);
                                  }else {
                                    console.log("esta entrando al else");
                                    return <Card key={object.id} object={object}/>
                                  }  
                                })}
                            </div>
                        </div>   
          case 'Ciudad':
            return      <div className="recomendations">
                            <h2 className = "recomendationsH2">Resultados de busqueda por ciudad</h2>
                            <div className='recomendations_container'>
                                {dataCiudad.map((object) => (
                                    <Card key={object.id} object={object}/>
                                ))}
                            </div>
                        </div> 
        case 'Fechas':
            return      <div className="recomendations">
                                <h2 className = "recomendationsH2">Resultados de busqueda por fecha</h2>
                            <div className='recomendations_container'>
                                    {fechas.map((object) => (
                                    <Card key={object.id} object={object}/>
                                 ))}
                            </div>
                        </div>
        case 'fechasCiudad':
            return      <div className="recomendations">
                            <h2 className = "recomendationsH2">Resultados de busqueda por fecha y ciudad</h2>
                            <div className='recomendations_container'>
                                {fechasYCiudad.map((object) => (
                                    <Card key={object.id} object={object}/>
                                ))}
                            </div>
                        </div>  
        case 'Default':
            return<div className="recomendations">
                            <h2 className = "recomendationsH2">NO SE ENCONTRARON RESULTADOS</h2>
                        </div>                                 
          default:
            return  <div className="recomendations">
                        <h2 className = "recomendationsH2">Recomendaciones</h2>
                        <div className='recomendations_container'>
                            {list.map((object) => {
                                  if (object.imagenes.length === 0) {
                                    console.log(object);
                                  }else {
                                    console.log("esta entrando al else");
                                    return <Card key={object.id} object={object}/>
                                  }  
                            })}
                        </div>
                    </div> ;
        }
    }

    const buttonClass = loaded ? 'noSearch' : 'search';
    const buttonText = loaded ? "Cargando..." : "Buscar"
    
    return(
        <div className = "App">
            <Header />
                <main>
                    <Searcher onInfoChange={handleCiudad} clicks={handleKeywordChange} dateInfo={handleDate} loading={loaded} buttonClass={buttonClass} buttonText={buttonText}/>
                    <div className='categories'>
                        <h2>Buscar por tipo de alojamiento</h2>
                        <div className='categories_contianer'>
                            {category.map((object) => (
                            <Category productos={productos} key={object.id} object={object} keyword={() => handleKeywordChange(object.titulo)}/>
                            ))}
                        </div>
                    </div>
                    {renderCard()}
                </main>
            <Footer />
        </div>
    );
}

// Exports
export {Home};