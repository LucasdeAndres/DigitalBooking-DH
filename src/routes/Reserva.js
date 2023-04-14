// Imports
    // Librarys
    import axios from "axios";
    import React, { useEffect, useState } from "react";
    import { useNavigate, useParams } from "react-router-dom";
    import { BloqueHeader } from "../components/BloqueHeader";
    import { DatosUbicacion } from "../components/DatosUbicacion";
    import { Footer } from "../components/Footer";
    import {Header} from "../components/header/Header";
    import { Politicas } from "../components/Politicas";
import { ReservaFormA } from "../components/ReservaFormA";
import { ReservaFormB } from "../components/ReservaFormB";
import { ReservaFormC } from "../components/ReservaFormC";
import { ReservaFormD } from "../components/ReservaFormD";
    import product from "../jsons/product.json"
    // Styles
    import "./styles/reservaStyle.css"
    
    // Component 

    const Reserva = () => {
    
        const [data, setData] = useState(null);
        const { id } = useParams();
    
        const productoId = parseInt(id)

        useEffect(() => {
          axios.get(`http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/productos/${id}`)
            .then(function (response) {
              setData(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }, [id]);

        console.log(data);

        let arrayFechas = [];


        useEffect(() => {
          const timer = setTimeout(() => {
            data.reservas.map((element) => {
              arrayFechas.push({start: new Date(element.fechaDesde + "T00:00:00"), end: new Date(element.fechaHasta + "T00:00:00")})
              console.log(arrayFechas);
          })
    
          }, 500);
      
          return () => clearTimeout(timer);
        } );

        console.log(arrayFechas);

        const handleChange = (event) => {
          const target = event.target;
          const value = target.value;
          const name = target.name;
      
          setDatosReserva({
            ...datosReserva,
            [name]: value
          });
        }


        const [date, setDate] = useState([]);

        const handleDate = (date) => {
          const [startDate, endDate] = date;
        
          let formattedDate = startDate ? `${date[0].getFullYear()}-${(date[0].getMonth() + 1).toString().padStart(2, '0')}-${date[0].getDate().toString().padStart(2, '0')}` : "";
          let formattedEndDate = endDate ? `${date[1].getFullYear()}-${(date[1].getMonth() + 1).toString().padStart(2, '0')}-${date[1].getDate().toString().padStart(2, '0')}` : "";
        
          setDate(date);
        
          setDatosReserva({
            ...datosReserva,
            fechaDesde: formattedDate,
            fechaHasta: formattedEndDate
          });
        }
        
        

        const [user, setUser] = useState({});

        useEffect(() => {
          const savedUser = localStorage.getItem('user');
          const parsedUser = savedUser ? JSON.parse(savedUser) : {};
          setUser(parsedUser);
          setDatosReserva({
            ...datosReserva,
            idUsuario : parsedUser.id
          });
        }, []);

        const [jwt, setJwt] = useState({});

        useEffect(() => {
          const savedUser = localStorage.getItem('jwt');
          const parsedUser = savedUser ? JSON.parse(savedUser) : {};
          setJwt(parsedUser);
          
        }, []);

        console.log(jwt);

        const navigate = useNavigate();

          const handleSubmit = (e) => {
            e.preventDefault();


            const camposVacios = [];

            if (!datosReserva.ciudad) {
              camposVacios.push("Ciudad");
            }
            if (!datosReserva.horaReserva) {
              camposVacios.push("Hora de reserva");
            }
            if (!datosReserva.fechaDesde) {
              camposVacios.push("Fecha de inicio");
            }
            if (!datosReserva.fechaHasta) {
              camposVacios.push("Fecha de fin");
            }

            if (camposVacios.length > 0) {
              alert(`Los siguientes campos están vacíos: \n ${"\n• " + camposVacios.join("\n• ")}`);
              return;
            }
          
            axios.patch(`http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/auth/user/${user.id}`, JSON.stringify({
              ciudad: datosReserva.ciudad
            }), {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
              }
            })
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
                    
            const reservaData = {
              horaReserva: datosReserva.horaReserva,
              fechaDesde: datosReserva.fechaDesde,
              fechaHasta: datosReserva.fechaHasta,
              idProducto: datosReserva.idProducto,
              idUsuario: datosReserva.idUsuario
            };
          
            axios.post("http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/reservas/add", JSON.stringify(reservaData), {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              }
            })
            .then(function (response) {
              console.log(response.data);
              console.log(response.status);
              if (response.status === 201) {
                navigate("/reservaExitosa");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
            
          };

          const [datosReserva, setDatosReserva] = useState({
            ciudad: '',
            horaReserva: '',
            fechaDesde: '',
            fechaHasta: '',
            idProducto: productoId,
            idUsuario: '',
          });
          
          if (data === null) {
            return <div>Cargando...</div>;
          }

          const object = data
  
          console.log(data);
    
        return(
            <React.Fragment>
                <Header />
                    <section>
                        <BloqueHeader object={data} ruta={`/productos/${object.id}`}/>
                        <DatosUbicacion object={data}/>
                        <form className="formReserva" onSubmit={handleSubmit}>
                          <div className="reserva_Bloque1">
                            <h2>Completa tus datos</h2>
                            <ReservaFormA handleOnChange={handleChange}/>
                            <h2>Selecciona tu fecha de reserva</h2>
                            <ReservaFormB dateInfo={handleDate} fechaReservas={arrayFechas}/>
                            <h2>Tu horario de llegada</h2>
                            <ReservaFormC handleOnChange={handleChange}/>
                          </div>
                          <div className="reserva_Bloque2"> 
                            <ReservaFormD data={data} dateInfo={date}/>
                          </div>   
                        </form>
                        <Politicas data={data}/>
                    </section>
                <Footer />
            </React.Fragment>
        )
    }
    
    // Export
    export {Reserva};