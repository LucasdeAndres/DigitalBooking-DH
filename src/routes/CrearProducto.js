// Imports
    // Librarys
    import axios from "axios";
    import React, { useEffect, useState } from "react";
    import { Footer } from "../components/Footer";
    import {Header} from "../components/header/Header";
import bloqueHeaderImage from "../multimedia/bloqueHeader.png"
 
    // Styles
    import "./styles/reservaStyle.css"
    import "../components/styles/bloqueHeaderStyle.css"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faImage,
} from '@fortawesome/free-solid-svg-icons';
    // Component 

    const CrearProducto = () => {

        const [ciudades, setCiudades] = useState([]);

        useEffect(() => {
          axios.get("http://ec2-18-119-10-128.us-east-2.compute.amazonaws.com:8080/ciudades")
          .then( res => setCiudades(res.data))
        },[])

        console.log(ciudades);
        const [category, setCategory] = useState([]);

        useEffect(() => {
            axios.get("http://ec2-18-119-10-128.us-east-2.compute.amazonaws.com:8080/categorias")
            .then( res => setCategory(res.data))
            .catch(error => {
                console.error('Error fetching categorias data:', error);
              });
        },[])

        const [caracteristicas, setCaracteristicas] = useState([]);

        useEffect(() => {
            axios.get("http://ec2-18-119-10-128.us-east-2.compute.amazonaws.com:8080/caracteristicas")
            .then( res => setCaracteristicas(res.data))
            .catch(error => {
                console.error('Error fetching categorias data:', error);
              });
        },[])       
        
        console.log(caracteristicas);

        const [arrayCaracteristicas, setArrayCaracteristicas] = useState([]);

        const handleCheckboxChange = (event) => {
          const caracteristicaSeleccionada = event.target.value;
      
          if (event.target.checked) {
            setArrayCaracteristicas([...arrayCaracteristicas, { "idcaracteristica": caracteristicaSeleccionada}]);
          } else {
            setArrayCaracteristicas(
              arrayCaracteristicas.filter((caracteristica) => caracteristica !== caracteristicaSeleccionada )
            );
          }
        };

        console.log(arrayCaracteristicas);


        const [jwt, setJwt] = useState({});

        useEffect(() => {
          const savedUser = localStorage.getItem('jwt');
          const parsedUser = savedUser ? JSON.parse(savedUser) : {};
          setJwt(parsedUser);
          
        }, []);

        console.log(jwt);


        const [datosCrearProducto, setDatosCrearProducto] = useState({
            titulo: "",
            ubicacion: "",
            descripcion: "",
            direccion: "",
            categoria: {},
            ciudad: {},
            caracteristicas: [],
            normasCasa: "",
            medidasSaludSeguridad: "",
            politicasCancelacion: ""
        });

        const handleChange = (event) => {
            const target = event.target;
            const value = target.value;
            const name = target.name;

            console.log(value);
        
            setDatosCrearProducto({
              ...datosCrearProducto,
              [name]: value
            });
          }

          const [imagenes, setImagenes] = useState([]);

          console.log(imagenes);

          const handleAgregarImagen = () => {
            const nuevaImagen = document.getElementById("url").value.trim();
          
            if (nuevaImagen) {
              const img = new Image();
              img.onload = function() {
                if (img.width >= 900 || img.height >= 650) {
                  setImagenes((prevImagenes) => prevImagenes.concat(nuevaImagen));
                  document.getElementById("url").value = "";
                } 
              };
              img.src = nuevaImagen;
            }
          };

          const handleEliminarImagen = (index) => {
            setImagenes((prevImagenes) => {
              const nuevasImagenes = [...prevImagenes];
              nuevasImagenes.splice(index, 1);
              return nuevasImagenes;
            });
          };

         const capitalizarPalabras = (event) => {
            const input = event.target;
            const texto = input.value;
            const palabras = texto.split(" ");
            const palabrasCapitalizadas = palabras.map((palabra) => {
              const primeraLetra = palabra.charAt(0).toUpperCase();
              const restoPalabra = palabra.slice(1);
              return primeraLetra + restoPalabra;
            });
            const textoCapitalizado = palabrasCapitalizadas.join(" ");
            input.value = textoCapitalizado;
          }

          const [error, setError] = useState("");

          const handleDireccionChange = (event) => {
            const input = event.target;
            const texto = input.value;
            const palabras = texto.split(" ");
            const palabrasCapitalizadas = palabras.map((palabra) => {
              const primeraLetra = palabra.charAt(0).toUpperCase();
              const restoPalabra = palabra.slice(1);
              return primeraLetra + restoPalabra;
            });
            const textoCapitalizado = palabrasCapitalizadas.join(" ");
            input.value = textoCapitalizado;
            const pattern = /^([\w\s]+\d+),\s*([\w\s]+)*,\s*([\w\s]+)*,\s*([\w\s]+)$/;
            if (!pattern.test(input.value)) {
              setError("El formato es: calle y número, ciudad, estado, país");
              input.style.border = "1px solid red"; 
            } else {
              setError("");
              input.style.borderColor = "initial"; 
            }
          };

          const [errorDescripcion, setErrorDescripcion] = useState("");
  
          const handleTextAreaChange = (event) => {
            const input = event.target;
            const texto = input.value;
            const palabras = texto.trim().split(/\s+/);
            const cantidadPalabras = palabras.length;
        
            if (cantidadPalabras < 34) {
              setErrorDescripcion("Por favor, ingrese al menos 34 palabras");
              input.style.border = "1px solid red"; 
            } else if (cantidadPalabras > 50) {
              setErrorDescripcion("Por favor, ingrese como máximo 50 palabras");
              input.style.border= "1px solid red"; 
            } else {
              setErrorDescripcion("");
              input.style.borderColor = "initial"; 
            }
          };

          const [errorPoliticas, setErrorPoliticas] = useState("");

          const handleTextoChange = (event) => {
            const input = event.target;
            const texto = input.value;
            const palabras = texto.split(/\s+/);
            if (palabras.length > 50) {
              setErrorPoliticas("Máximo 50 palabras permitidas");
              input.style.border = "1px solid red"; 
            } else {
              setErrorPoliticas("");
              input.style.borderColor = "initial"; 
            }
          };

          const [errorPoliticas2, setErrorPoliticas2] = useState("");

          const handleTextoChange2 = (event) => {
            const input = event.target;
            const texto = input.value;
            const palabras = texto.split(/\s+/);
            if (palabras.length > 50) {
              setErrorPoliticas2("Máximo 50 palabras permitidas");
              input.style.border= "1px solid red"; 
            } else {
              setErrorPoliticas2("");
              input.style.borderColor = "initial"; 
            }
          };

          const [errorPoliticas3, setErrorPoliticas3] = useState("");

          const handleTextoChange3 = (event) => {
            const input = event.target;
            const texto = input.value;
            const palabras = texto.split(/\s+/);
            if (palabras.length > 50) {
              setErrorPoliticas3("Máximo 50 palabras permitidas");
              input.style.border = "1px solid red"; 
            } else {
              setErrorPoliticas3("");
              input.style.borderColor = "initial"; 
            }
          };

          const [errorImagenes, setErrorImagenes] = useState("");

          const handleImagenesChange = (event) => {
            const input = event.target;
            const url = input.value;
            const img = new Image();
            img.onload = function() {
              if (this.naturalWidth < 900 || this.naturalHeight < 650) {
                setErrorImagenes('La imagen debe tener al menos 900 x 650 píxeles.');
              } else {
                setErrorImagenes('');
              }
            };
            img.src = url;
          };
          
    
        const navigate = useNavigate();

        const handleSubmit = (e) => {
            e.preventDefault();

            const camposVacios = [];

            if (!datosCrearProducto.titulo) {
              camposVacios.push("Titulo");
            }
            if (!datosCrearProducto.direccion) {
              camposVacios.push("Direccion");
            }
            if (!datosCrearProducto.descripcion) {
              camposVacios.push("Descripcion");
            }
            if (!datosCrearProducto.categoria) {
              camposVacios.push("Categoria");
            }
            if (!datosCrearProducto.ciudad) {
              camposVacios.push("Ciudad");
            }
            if (!arrayCaracteristicas || arrayCaracteristicas.length === 0) {
              camposVacios.push("Caracteristicas");
            }
            if (!datosCrearProducto.normasCasa) {
              camposVacios.push("Normas de casa");
            }
            if (!datosCrearProducto.medidasSaludSeguridad) {
              camposVacios.push("Medidas de salud y seguridad");
            }
            if (!datosCrearProducto.politicasCancelacion) {
              camposVacios.push("Politicas de cancelacion");
            }


            if (camposVacios.length > 0) {
              alert(`Los siguientes campos están vacíos: \n ${"\n• " + camposVacios.join("\n• ")}`);
              return;
            }

            let productoId = 0

            if(imagenes.length >= 5) {
                const crearProductoData = {
                    titulo: datosCrearProducto.titulo,
                    ubicacion: datosCrearProducto.direccion,
                    descripcion: datosCrearProducto.descripcion,
                    direccion: datosCrearProducto.direccion,
                    categoria: { id: Number(datosCrearProducto.categoria)},
                    ciudad: { id: Number(datosCrearProducto.ciudad)},
                    caracteristicas: arrayCaracteristicas.map(caracteristica => ({ idcaracteristica: parseInt(caracteristica.idcaracteristica) })),
                    normasCasa: datosCrearProducto.normasCasa,
                    medidasSaludSeguridad: datosCrearProducto.medidasSaludSeguridad,
                    politicasCancelacion: datosCrearProducto.politicasCancelacion
                }
    
                axios.post("http://ec2-18-119-10-128.us-east-2.compute.amazonaws.com:8080/productos/add", JSON.stringify(crearProductoData), {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${jwt}`
                    }
                  })
                  .then(function (response) {
                    console.log(response.data);
                    console.log(response.status);
                    console.log(response);
                    productoId = response.data.id
                    const crearImagenes = imagenes.map(imagen => ({
                      titulo: datosCrearProducto.titulo,
                      producto: {id: productoId},
                      url: imagen
                  }));
  
                  console.log(crearImagenes);
                  
                  Promise.all(
                    crearImagenes.map(imagen =>
                      axios.post("http://ec2-18-119-10-128.us-east-2.compute.amazonaws.com:8080/imagenes/add", JSON.stringify(imagen), {
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${jwt}`
                        }
                      })
                    )
                  )
                    .then(function (response) {
                      console.log(response);
                      console.log(response.status);
                      if (response.status === 201) {
                        navigate("/productoCreado");
                      }else {
                        navigate("/productoCreado");
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
    
                  console.log(productoId);


            }else {
                alert("Tiene que subir al menos 5 imagenes")
            }


        }


    
        return(
            <React.Fragment>
                <Header />
                    <section>
                        <div className = "BloqueHeader_div"> 
                            <div>
                                <h2>Administracion</h2>
                            </div>
                            <Link to={`/`}><img src = {bloqueHeaderImage} alt = "Icon <" /> </Link>
                        </div>
                        <section className="crearPropiedad">
                        <h1>Crear Propiedad</h1>
                        <form className="formProducto" onSubmit={handleSubmit}>
                                <div className="principio">
                                    <div className="principio_main">
                                        <div className="principio_bloque1">
                                            <p>Nombre de la propiedad</p>
                                            <input type="text" name="titulo" placeholder="Ej. Trump Tower" onChange={handleChange} className="input_suave" onInput={capitalizarPalabras}></input>
                                            <p>Direccion</p>
                                            <input type="text" name="direccion" placeholder="Ej. Calle Falsa 123,Springfield,Oregon,USA" onChange={handleChange} className="input_suave" onInput={handleDireccionChange} pattern="/^([\w\s]+\d+),\s*([\w\s]+)*,\s*([\w\s]+)*,\s*([\w\s]+)$/" /> {error && <div style={{ color: "red" }}>{error}</div>}
                                        </div>
                                        <div className="principio_bloque2">
                                            <p>Categoria</p>
                                            <select name="categoria" onChange={handleChange} >
                                            <option value="" disabled selected> Seleccionar categoria </option>
                                                {category.map((value) => (
                                                    <option value={value.id} key={value.id}>{value.titulo}</option>
                                                ))}
                                            </select>
                                            <p>Ciudad</p>
                                            <select name="ciudad" onChange={handleChange} >
                                            <option value="" disabled selected> Seleccionar ciudad </option>
                                                {ciudades.map((value) => (
                                                    <option value={value.id} key={value.id}>{value.ciudad}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>    
                                    <div className="principio_bloque3"> 
                                        <p>Descripcion</p>
                                        <textarea type="text" placeholder="Escribe aqui" name="descripcion" onChange={handleChange} className="input_suave" onInput={handleTextAreaChange}></textarea> {errorDescripcion && <div style={{ color: "red" }}>{errorDescripcion} </div>}
                                    </div>
                                </div>
                                <div className="medio">
                                    <h2>Agregar atributo</h2>
                                    <div className="medio_main">
                                        {caracteristicas.map((element) => {
                                            return(
                                                <div className="checkBox" key={element.idcaracteristica}>
                                                    <input name={element.caracteristicaNombre} value={element.idcaracteristica} type="checkbox"  onChange={handleCheckboxChange} />
                                                    <label>{element.caracteristicaNombre}</label>
                                                </div>
                                            )
                                        })}
                                    </div>    
                                </div>
                                <div className="medio2">
                                    <h2>Politicas del producto</h2>
                                    <div className="medio2_main">
                                        <div className="medio2_bloque1">
                                            <h4>Normas de la casa</h4>
                                            <p>Descripcion</p>
                                            <textarea type="text" placeholder="Escribir Aqui" name="normasCasa" onChange={handleChange} className="input_suave" onInput={handleTextoChange}></textarea> {errorPoliticas && <div style={{ color: "red" }}>{errorPoliticas} </div>}
                                        </div>
                                        <div className="medio2_bloque2">
                                            <h4>Salud y seguridad</h4>
                                            <p>Descripcion</p>
                                            <textarea type="text" placeholder="Escribir Aqui" name="medidasSaludSeguridad" onChange={handleChange} className="input_suave" onInput={handleTextoChange2}></textarea> {errorPoliticas2 && <div style={{ color: "red" }}>{errorPoliticas2} </div>}
                                        </div>
                                        <div className="medio2_bloque3"> 
                                            <h4>Politicas de cancelacion</h4>
                                            <p>Descripcion</p>
                                            <textarea type="text" placeholder="Escribir Aqui" name="politicasCancelacion" onChange={handleChange} className="input_suave" onInput={handleTextoChange3}></textarea>{errorPoliticas3 && <div style={{ color: "red" }}>{errorPoliticas3} </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="final">
                                    <h2>Cargar imagenes</h2>
                                    <div className="final_main">
                                        <input id="url" type="text" placeholder="URL" className="input_suave" onInput={handleImagenesChange}/> {errorImagenes && <div style={{ color: "red" }}>{errorImagenes} </div>}
                                        <button type="button" onClick={handleAgregarImagen}> + </button>
                                    </div>
                                    <div className="final_main_2">
                                    {imagenes.length > 0 ? (
                                        imagenes.map((imagen, index) => (
                                          <div className="final_imagen" key={index} onClick={() => handleEliminarImagen(index)}>
                                            <img src={imagen} />
                                          </div>
                                        ))
                                      ) : (
                                        <div className="icon_crearProducto_2">
                                          <FontAwesomeIcon icon={faImage} />
                                        </div>
                                      )}
                                    </div>
                                </div>
                                <button className="formProducto_crear" type="submit">Crear </button>
                            </form>
                        </section>
                    </section> 
                <Footer />
            </React.Fragment>
        )
    }
    
    // Export
    export {CrearProducto} 