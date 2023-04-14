import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../multimedia/logo1.png';
import './HeaderStyle.css';
import Menu from './menu/Menu';

const Header = () => {
  
  const location = useLocation()

  return (
    <header className={`header ${location.pathname == "/register" || location.pathname == "/register" ? "postRel" : "" }`}>
      <nav className="nav">
        <div className="containerLeft">
          <Link to="/" aria-label="Página de inicio de Digital Booking">
            <img src={logo} alt="logo" />
          </Link>
          <span className="motto">Sentite como en tu hogar</span>
        </div>
        <Menu />
      </nav>
    </header>
  );
};

export {Header};
