// Imports
// Librarys
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../jsons/users.json";
import { userContext } from "../context/UserContext";
// Components
import { Footer } from "../components/Footer";
import { Header } from "../components/header/Header";
import { GeneralInput } from "../components/forms/generalInput";
// Styles
import "../components/forms/formsContainerStyles.css";

// Component
const Register = () => {
	const [name, setName] = useState({ value: "", valid: null });
	const [lastName, setLastName] = useState({ value: "", valid: null });
	const [email, setEmail] = useState({ value: "", valid: null });
	const [password, setPassword] = useState({ value: "", valid: null });
	const [password2, setPassword2] = useState({ value: "", valid: null });

	const [isFormValid, setIsFormValid] = useState(null);
	const [msgError, setMsgError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { loginUser } = useContext(userContext);

	const navigate = useNavigate();

	const regularExpressions = {
		nameAndLastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		password: /^.{7,25}$/, // 7 to 25 digits.
	};

	const validateRepeatPassword = () => {
		if (password.value.length > 0) {
			if (password.value !== password2.value) {
				setPassword2((prevState) => {
					return { ...prevState, valid: "false" };
				});
			} else if (password.valid === "false") {
				setPassword2((prevState) => {
					return { ...prevState, valid: "false" };
				});
			} else {
				setPassword2((prevState) => {
					return { ...prevState, valid: "true" };
				});
			}
		} else if (password.value === "") {
			setPassword2((prevState) => {
				return { ...prevState, valid: "false" };
			});
		}
	};

	const validateInputs = () => {
		if (name.value === "") {
			setName((prevState) => {
				return { ...prevState, valid: "false" };
			});
		}
		if (lastName.value === "") {
			setLastName((prevState) => {
				return { ...prevState, valid: "false" };
			});
		}
		if (email.value === "") {
			setEmail((prevState) => {
				return { ...prevState, valid: "false" };
			});
		}
		if (password.value === "") {
			setPassword((prevState) => {
				return { ...prevState, valid: "false" };
			});
		}
		if (password2.value === "") {
			setPassword2((prevState) => {
				return { ...prevState, valid: "false" };
			});
		}
	};

	const validateForm = () => {
		return (
			name.valid === "true" &&
			lastName.valid === "true" &&
			email.valid === "true" &&
			password.valid === "true" &&
			password2.valid === "true"
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		validateInputs();
		setIsFormValid(true);

		if (validateForm()) {
			setIsLoading(true);
			const data = {
				nombre: name.value,
				apellido: lastName.value,
				email: email.value,
				password: password.value,
				role: ["USER"],
			};
			let responseClone = ""; //1
			await fetch("http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/auth/user/signup", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					responseClone = res.clone(); //2
					return res.json();
				})
				.then(
					(data) => {
						if (data.mesagge == "Error: Email is already taken!") {
							console.log(data)
							console.log("bien");
							localStorage.clear();
							fetch("http://ec2-3-145-180-105.us-east-2.compute.amazonaws.com:8080/auth/user/signup", {
								method: "POST",
								body: JSON.stringify({
									nombre: name.value,
									apellido: lastName.value,
									email: email.value,
									password: password.value,
									role: ["USER"],
								}),
								headers: {
									"Content-Type": "application/json",
								},
							})
								.then((res) => res.json())
								.then((data) => {
									if(data.status == 201){
										navigate("/")
									}
									setIsLoading(false);
									loginUser({ ...data, redirect: false });
								})
								.catch((err) => {
									setIsFormValid(false);
									setIsLoading(false);
									setMsgError(
										"La cuenta se ha creado exitosamente, pero hay un error al intentar loguearse."
									);
									//console.log('error', err);
								});
						} else {
							setIsFormValid(false);
							setIsLoading(false);
							setMsgError(
								"Lamentablemente no ha podido registrarse. Posiblemente este correo ya esta en uso."
							);
						}
						
					},
					function (rejectionReason) {
						navigate("/login")
						responseClone
							.text() // 5
							.then(function (bodyText) {
								setIsFormValid(false);
								setMsgError(`${bodyText}`);
							});
					}
				);
		}
	};

	return (
		<React.Fragment>
			<Header />
			<section className="Register__section">
				<form className="section__form" onSubmit={handleSubmit} onChange={validateForm}>
					<h1 className="form__h1">Crear cuenta</h1>
					<div>
						<div className="inputGroup">
							<GeneralInput
								state={name}
								changeState={setName}
								label="Nombre"
								type="text"
								id="name"
								name="name"
								error="Sólo están permitidas letras y espacios"
								regex={regularExpressions.nameAndLastName}
							/>
							<GeneralInput
								state={lastName}
								changeState={setLastName}
								label="Apellido"
								type="text"
								id="lastName"
								name="lastName"
								error="Sólo están permitidas letras y espacios"
								regex={regularExpressions.nameAndLastName}
							/>
						</div>

						<GeneralInput
							state={email}
							changeState={setEmail}
							label="Correo electrónico"
							type="email"
							id="email"
							name="email"
							error="Correo electrónico incorrecto"
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
						<GeneralInput
							state={password2}
							changeState={setPassword2}
							label="Confirmar contraseña"
							type="password"
							id="password2"
							name="password2"
							error="Las contraseñas deben ser iguales"
							// regex={regularExpressions.password}
							executeFunction={validateRepeatPassword}
						/>
						{isFormValid === false && (
							<p className="msgErrorInvalidForm">
								{msgError
									? msgError
									: "Por favor vuelva a intentarlo, algunos de los datos ingresados no son correctos."}
							</p>
						)}
					</div>
					<button type="submit" className="btn btn2 submitButton">
						Crear cuenta
					</button>
					<span className="div__span">
						¿Ya tienes una cuenta?{" "}
						<Link className="div__a" to="/login">
							Iniciar sesión
						</Link>
					</span>
				</form>
			</section>
			<Footer />
		</React.Fragment>
	);
};

// Export
export { Register };
