import React, { useEffect, useState } from 'react'
import "./styles/reservaFormAStyle.css"

export function ReservaFormA({handleOnChange}) {

    const [user, setUser] = useState({});
    const [telefonoError, setTelefonoError] = useState(false);

    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      const parsedUser = savedUser ? JSON.parse(savedUser) : {};
      setUser(parsedUser);
    }, []);

    const handleTelefonoChange = (event) => {
        const telefonoValue = event.target.value;
        if (telefonoValue === '') {
            setTelefonoError(true);
        } else {
            setTelefonoError(false);
        }
        handleOnChange(event);
    }


  return (
    <div className='reservaFormA'>
        <div className='bloque1'>
            <div>
                <label>
                    Nombre <input type="text" value={user.nombre} readOnly/>
                </label>
            </div>
            <div>
                <label>
                    Correo electronico <input type="email" value={user.email} readOnly/>
                </label>
            </div>
        </div> 
        <div className='bloque2'>   
            <div>
                <label>
                    Apellido <input type="text" value={user.apellido} readOnly/>
                </label>
            </div>
            <div>
                <label>
                    Ciudad <input type="text" name='ciudad' onChange={handleTelefonoChange} className={telefonoError ? 'error' : ''} />
                    {telefonoError && (
                        <div className="error-message">
                            <span className="warning-icon">⚠️</span>
                            Se requiere completar este campo
                        </div>
                    )}
                </label>
            </div>
        </div>    
    </div>    
  )
}
