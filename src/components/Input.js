// Imports
 // Librarys
import React, {useState} from "react";
// Styles

// Component
const Input = ({diff, nameInput, stateInput, setStateInput, expressionsInput}) => {

    // States
    const [state, setState] = useState("");

    // Events 
    const handleChange = (e) => {
        setState(e.target.value);
        setStateInput({...stateInput, area: e.target.value})
    }

    // Input types
    function inputType (text) {
        let type = "";
        if(text === "Contraseña" || text === "Confirmar contraseña"){
            type = "password";
        }else if(text === "Correo electrónico"){
            type = "email";
        }else{
            type = "text";
        }
        return type;
    }

    // Validations 
    const validation = () => {
        if(expressionsInput || null){
            if(expressionsInput.test(stateInput.area)){
                setStateInput({...stateInput, valido: 'true'});
            }else{
                setStateInput({...stateInput, valido: 'false'});
            }
        }
    }

    return(
        <div className = {`Input__div-${diff} input__div ${nameInput === "Correo electrónico" || nameInput === "Contraseña" ? 'loginInputs' : ''}`}>
            <input onChange = {handleChange} onKeyUp = {validation} onBlur = {validation} className = {`div__input-${diff} ${state ? `has__value-${stateInput.valido}` : ""}`} type = {inputType(nameInput)} id = {nameInput} required/>
            <label htmlFor = {nameInput}>{nameInput}</label>
        </div>
    )
}

// Exports
export {Input};