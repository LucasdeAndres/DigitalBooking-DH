import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userContext } from '../../context/UserContext';
import Avatar from '../header/avatar/Avatar';
import style from '../header/menu/Menu.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const userContextResult = useContext(userContext);
  const loggedIn = userContextResult.userJwt;
  const roleType = userContextResult?.userInfo?.role;

  const { pathname } = useLocation();

  const toggleMenu = () => {
    const overlay = document.querySelector('.overlay');
    const menu = document.querySelector('#menu');
    menu.classList.toggle(style.menuOpened);
    // console.log(overlay);

    overlay.classList.toggle('visible');
  };

  return (
    <div className={style.menu} id="menu">
      {/* Despliegue de sidebar */}
      {/* Menu top */}
      <div className={`${style.menuTop} ${!loggedIn ? '' : style.loggedIn}`}>
        <button
          className={style.closeMenu}
          onClick={toggleMenu}
          aria-label="Cerrar menú de usuario"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {!loggedIn ? (
          <>
            <p className={style.menuTitle}>menú</p>{' '}
          </>
        ) : (
          <Avatar />
        )}
      </div>
      {/* Menu Body */}
      <div className={style.menuBody}>
        {!loggedIn ? (
          <ul>
            {pathname !== '/register' && (
              <li>
                <Link to="/register">Crear cuenta</Link>
              </li>
            )}
            {(pathname !== '/login') & (pathname !== '/signup') ? (
              <span className={style.lineOrange}></span>
            ) : (
              <></>
            )}
            {pathname !== '/login' && (
              <li>
                <Link to="/login">Iniciar sesión</Link>
              </li>
            )}
          </ul>
        ) : (
          <ul>
            {loggedIn &&
              roleType === 'ADMIN' &&
              pathname !== '/administration' ?
                <li>
                  <Link to="/administration">Administración</Link>
                </li>
              : <div><Link to={`/${userContextResult.userInfo.id}/reservas`} className="">
              Mis reservas
            </Link><span className={style.lineOrange}></span></div>}
          </ul>
        )}
      </div>
      {/* Menu Fotter */}
      <div className={style.menuFooter}>
        {loggedIn && (
          <>
            <p>
              ¿Deseas{' '}
              <Link
                className={style.signOff}
                onClick={() => userContextResult.logoutUser()}
                to='/'
              >
                cerrar sesión
              </Link>
              ?
            </p>
            <span className={style.lineOrange}></span>
          </>
        )}

        
      </div>
    </div>
  );
};

export default SideBar;