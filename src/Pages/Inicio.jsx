import React from "react";
import '../Styles/Inicio.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import EventIcon from '@mui/icons-material/Event'; // Icono de calendario

export default function Inicio() {
  const navigate = useNavigate();

  const handleMenuPrincipal = () => {
    navigate("/AgendarCita");
  };

  return (
    <div className="main-wrapper">
      <div className="container-main">
        <h1>Registro de Citas Odontologicas</h1>
        <p className="descripcion">
          Aplicación web desarrollada en React que permite a los pacientes agendar, actualizar y eliminar citas odontológicas.
        </p>

        <h2>Funcionalidades Principales</h2>
        <ul>
          <li>Registro de Cita</li>
          <li>Actualizar Cita</li>
          <li>Eliminar Cita</li>
        </ul>

        <h2>Tecnologías Utilizadas</h2>
        <p>React • React Router • Material UI</p>

        <Button
          variant="contained"
          startIcon={<EventIcon />}
          className="btn"
          onClick={handleMenuPrincipal}
        >
          Agendar Cita
        </Button>
      </div>
    </div>
  );
}
