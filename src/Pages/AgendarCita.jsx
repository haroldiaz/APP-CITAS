import React, { useState, useEffect } from 'react';
import '../Styles/AgendarCita.css';
import { useNavigate } from "react-router-dom";

export default function AgendarCita(){
const navigate = useNavigate();

    const [nombre, setNombre] = useState('');

    const cargarDato =() =>{
       setNombre(localStorage.getItem('nombre'));
    }

     // Cargar del localStorage al iniciar
      useEffect(() => {
        const nombreGuardado = localStorage.getItem('nombre');
       
        if (nombreGuardado) {
          setNombre(nombreGuardado);
        }
      }, []);

    const handleRegistrarCita = () => {
    navigate("/Registro"); 
    }
     const Cita = [
        { id: 1, nombre: "Ana", cedula: 25 ,telefono:1, fecha:'0:0:0',hora:1,motivo:"nada",nota:"nda"},
        { id: 2, nombre: "Luis", cedula: 30 ,telefono:1,fecha:'0:0:0',hora:1,motivo:"nada",nota:"nda"},
        { id: 3, nombre: "María", cedula: 28,telefono:1,fecha:'0:0:0',hora:1,motivo:"nada",nota:"nda"},
        { id: 4, nombre: "María", cedula: 28,telefono:1,fecha:'0:0:0',hora:1,motivo:"nada",nota:"nda"},
    ];
    return(
        <div className="container-cita">
            <div className="container-banner">
                <h1>Agendar Cita</h1>
                <h2>{nombre}</h2>
            </div>

            <div className="container-btn">
                <button onClick={handleRegistrarCita}className="btn-agendar">Agregar Cita</button>
            </div>
            <div>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Nombre</th>
                    <th style={thStyle}>Cedula</th>
                    <th style={thStyle}>Telefono</th>
                    <th style={thStyle}>Fecha</th>
                    <th style={thStyle}>Hora</th>
                    <th style={thStyle}>Motivo</th>
                    <th style={thStyle}>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {Cita.map((persona) => (
                    <tr key={persona.id}>
                        <td style={tdStyle}>{persona.id}</td>
                        <td style={tdStyle}>{persona.nombre}</td>
                        <td style={tdStyle}>{persona.cedula}</td>
                        <td style={tdStyle}>{persona.telefono}</td>
                        <td style={tdStyle}>{persona.fecha}</td>
                        <td style={tdStyle}>{persona.hora}</td>
                        <td style={tdStyle}>{persona.motivo}</td>
                        <td style={tdStyle}>{persona.nota}</td>
                        
                    </tr>
        ))}
      </tbody>
    </table>
            </div>
        </div>
    );
}
const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};