import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userContext } from '../../../context/UserContext';
import './avatarStyles.css';

const Avatar = () => {

  const location = useLocation()
  const { userJwt } = useContext(userContext);
  const [view, setView] = useState('');

  const userContextResult = useContext(userContext);
  
  const name = userContextResult.userInfo.nombre;
  const lastname = userContextResult.userInfo.apellido;

  const handleS = () => {
    if(userJwt != null){
      setView('view')
    }
  }

  return (
    <div className="Avatar_div">
      {userContextResult.userInfo.roles[0] === 'ROLE_ADMIN' && (
        <div className="containerRole">
          <Link to="/crearProducto" className="textRole">
            Administración
          </Link>{' '}
          <span className="lineOrangeVertical"></span>
        </div>
      )}
      <div onMouseOver={location.pathname == '/misReservas' ? null : handleS} className = 'initialsContainer'>
        <span>{`${name.substring(0, 1)}${lastname.substring(0, 1)}`}</span>
      </div>
      <div className = {`misReservasContainer ${view}`}>
        <Link to = {`/${userContextResult.userInfo.id}/reservas`}>Mis reservas</Link>
      </div>
      <p>
        <span className="greeting">Hola,</span>
        <br />
        {name} {lastname}
      </p>
    </div>
  );
};

export default Avatar;