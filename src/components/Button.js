// Imports
    // Librarys
import React from "react";
// Styles
import './styles/buttonStyle.css';

// Component
const Button = ({text, nameClass, click, clickTwo, loaded}) => {
    return(
        <React.Fragment>
            <button className={nameClass} onClick={() => { click(); clickTwo();}} disabled={loaded}> {text} </button>
        </React.Fragment>
    );
}

// Exports
export {Button};