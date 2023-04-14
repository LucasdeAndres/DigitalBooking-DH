import React, { useEffect, useState } from "react";

import './styles/categoryStyle.css'

const Category = ({object, keyword, productos}) => {

    console.log(productos.length);

    const [productosCategoria, setProductosCategoria] = useState([])

    useEffect(() => {
        const newArray = productos.filter(producto => producto.categoria.titulo === object.titulo);
        setProductosCategoria(newArray);
    }, [productos, object.titulo]);

    return(
        <div className='category' onClick={keyword}>
            <img className='imageCategory' src={object.urlImagen} />
            <div className='textCategory'>
                <h2>{object.titulo}</h2>
                <p> {`${productosCategoria.length} ${object.titulo}s`}</p>
            </div>
        </div>
    );
}

export { Category };