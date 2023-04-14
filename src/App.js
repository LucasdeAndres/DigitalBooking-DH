// Imports
  // Librarys
import React from "react";
import {Routes, Route} from 'react-router-dom';
  // Components
import {Register} from './routes/Register' 
import {Login} from "./routes/Login";
import {Home} from "./routes/Home";
import { Productos } from "./routes/Productos";
import UserContextProvider from "./context/UserContext";
import { Reserva } from "./routes/Reserva";
import { ReservaExitosa } from "./routes/ReservaExitosa";
import SideBar from "./components/sideBar/SideBar";
import { CrearProducto } from "./routes/CrearProducto";
import { ProductoCreado } from "./routes/ProductoCreado";
import { MisReservas } from "./components/misReservas/MisReservas";

// Component
function App() {
  return (
    // Routes
    <React.Fragment>
      <UserContextProvider>
        <div className="overlay"></div>
        <SideBar />

        <Routes>
          <Route path = "/register" element = {<Register />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/' element = {<Home />} />
          <Route path = "/productos" element = {<Productos />} />
          <Route path = "/productos/:id" element = {<Productos />} />
          <Route path = "/reserva" element = {<Reserva />} />
          <Route path = "/reserva/:id" element = {<Reserva />} />
          <Route path = "/reservaExitosa" element = {<ReservaExitosa />} />
          <Route path = "/crearProducto" element = {<CrearProducto />} />
          <Route path = "/productoCreado" element = {<ProductoCreado />} />
          <Route path = "/:id/reservas" element = {<MisReservas />} />
        </Routes>
      </UserContextProvider>
    </React.Fragment>
  );
}

// Exports
export {App};