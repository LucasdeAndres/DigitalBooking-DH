// Imports
    // Librarys
import React, { useContext, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
    // Components
import {Footer} from "../components/Footer";
import {Header} from "../components/header/Header";
import { userContext } from '../context/UserContext';
import { GeneralInput } from '../components/forms/generalInput';
// Styles
import '../components/forms/formsContainerStyles.css';

// Component
const Login = () => {
  const [email, setEmail] = useState({ value: '', valid: null });
  const [password, setPassword] = useState({ value: '', valid: null });
  const [isFormValid, setIsFormValid] = useState(null);
  const [msgError, setMsgError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { loginUser } = useContext(userContext);

  const navigate = useNavigate();

  const regularExpressions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{7,25}$/, // 7 to 25 digits.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormValid(true);

    if (email.value === '') {
      setEmail((prevState) => {
        return { ...prevState, valid: 'false' };
      });
    }
    if (password.value === '') {
      setPassword((prevState) => {
        return { ...prevState, valid: 'false' };
      });
    }

    if (email.valid === 'true' && password.valid === 'true') {
      const data = {
        email: email.value,
        password: password.value,
      };
      setIsLoading(true);
      fetch("http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/auth/user/signin", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.status === 401) {
            setMsgError = false
          }else{
            navigate("/");
          }
          setIsLoading(false);
          loginUser({ ...data, redirect: false });
        })
        .catch((err) => {
          setIsLoading(false);
          setIsFormValid(false);
          setMsgError(
            'Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde'
          );
        });
    }
  };

    return (
        <React.Fragment>
            <Header />
            <section className = "Login__section formLogin">
              <form className = "section__form" onSubmit={handleSubmit}>
                <h1 className = "form__h1" >Iniciar Sesión</h1>
                <div>
                    <GeneralInput
                    state={email}
                    changeState={setEmail}
                    label="Correo electrónico"
                    type="email"
                    id="email"
                    name="email"
                    error="Ingrese un correo electronico valido"
                    regex={regularExpressions.email}
                    />
                    <GeneralInput
                    state={password}
                    changeState={setPassword}
                    label="Contraseña"
                    type="password"
                    id="password"
                    name="password"
                    error="La contraseña debe tener entre 7 y 25 caracteres"
                    regex={regularExpressions.password}
                    />
                    {isFormValid === false && (
                    <p className = "msgErrorInvalidForm">
                        {msgError
                        ? msgError
                        : 'Por favor vuelva a intentarlo, sus credenciales son inválidas.'}
                    </p>
                    )}
                </div>
                <button type="submit" className = "btn btn2 submitButton">
                Ingresar
                </button>
                <span className = "div__span">
                ¿Aún no tenés cuenta?{' '}
                <Link className = "div__a" to="/register">
                    Registrate
                </Link>
                </span>
              </form>
            </section>
            <Footer />
        </React.Fragment>
    );
}

// Exports
export {Login};