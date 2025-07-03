import React from "react";
import '../Styles/AgendarCita.css';

export default function AgendarCita(){

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
            </div>
            <div className="container-btn">
                <button className="btn-agendar">Agregar Cita</button>
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