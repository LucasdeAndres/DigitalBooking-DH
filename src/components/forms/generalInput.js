import React, { useState } from 'react';
import './styles/generalInputStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const GeneralInput = ({
  state,
  changeState,
  label,
  type,
  id,
  name,
  error,
  placeholder,
  regex,
  executeFunction,
  readonly,
}) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [changeType, setChangeType] = useState(null);

  const toggleViewPassword = () => {
    !viewPassword ? setViewPassword(true) : setViewPassword(false);
    !changeType === 'password'
      ? setChangeType('text')
      : setChangeType('password');
  };

  const onChange = (e) => {
    changeState({ ...state, value: e.target.value });
  };

  const validation = () => {
    if (regex) {
      if (regex.test(state.value)) {
        changeState({ ...state, valid: 'true' });
      } else {
        changeState({ ...state, valid: 'false' });
      }
    }

    if (executeFunction) {
      executeFunction();
    }
  };

  return (
    <div className = "inputContainer">
      <label className = "label" htmlFor={name}>
        {label}
      </label>
      <div className = "inputContainer2">
        <input
          className={`input ${
            state.valid === 'false' ? 'inputError' : ''
          } `}
          type={id !== 'password' ? type : viewPassword ? 'text' : 'password'}
          id={name}
          name={name}
          value={state.value}
          onChange={onChange}

          placeholder={placeholder}
          onBlur={validation}
          valid={state.valid}
          readOnly={readonly && true}
        />
        {id === 'password' && state.value.length > 0 && (
          <span
            className = "iconVisibility"
            id="iconVisibility"
            data-activo="false"
          >
            {viewPassword ? (
              <FontAwesomeIcon
                onClick={toggleViewPassword}
                icon={faEye}
                fontSize="24px"
                width="24px"
                style={{ userSelect: 'none' }}
                title="Ocultar contraseña"
              />
            ) : (
              <FontAwesomeIcon
                onClick={toggleViewPassword}
                icon={faEyeSlash}
                fontSize="24px"
                width="24px"
                style={{ userSelect: 'none' }}
                title="Ver contraseña"
              />
            )}
          </span>
        )}
      </div>
      {state.valid === 'false' && (
        <span className = 'msgError'>{error}</span>
      )}
    </div>
  );
};

export {GeneralInput};