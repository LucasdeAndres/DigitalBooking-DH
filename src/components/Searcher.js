import React, { useEffect, useState } from 'react'
import { Button } from './Button'
import "./styles/searcherStyle.css"
import 'react-datepicker/dist/react-datepicker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Calendar } from './Calendar'
import { CalendarHome } from './CalendarHome'

function Searcher(props) {

  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    axios.get("http://ec2-18-119-10-128.us-east-2.compute.amazonaws.com:8080/ciudades")
    .then( res => setCiudades(res.data))
  },[])

  const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get("http://ec2-18-119-10-128.us-east-2.compute.amazonaws.com:8080/productos")
    .then( res => setProductos(res.data))
    },[])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const [ciudad, setCiudad] = useState("");

  console.log(props.loading);

  const search = () => {
    props.onInfoChange(ciudad)
  }

  const keyword = () =>{
    props.clicks("Busqueda")
  }

  return (
    <div className='main_container'>
      <h1>Busca ofertas en hoteles, casa y mucho mas</h1>
      <div className='container' >
        <form onSubmit={handleSubmit} >
          <div className='select' >
            <FontAwesomeIcon  className='locationDot' icon={faLocationDot} />
            <select id='ciudades' onChange={(event) => setCiudad(event.target.value)}>
            <option value="" hidden>  ¿A donde vamos? </option>
              {ciudades.map((value) => (
                <option value={value.ciudad} key={value.id}> 
                  <span className='option_icon'> 
                    <FontAwesomeIcon icon={faLocationDot} /> 
                  </span>
                  {value.ciudad}
                </option>
              ))}
            </select>
          </div>
          <div className='date'>
            {/* <FontAwesomeIcon  className='calendar' icon={faCalendar} /> */}
            <CalendarHome inline={false} dateInfo={props.dateInfo}/>
          </div>
          <Button text={props.buttonText} nameClass={props.buttonClass} click={search} clickTwo={keyword} loaded={props.loading}/>
        </form>
      </div>
    </div>
  )
}


export { Searcher };