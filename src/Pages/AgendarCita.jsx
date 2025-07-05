import React, { useState, useEffect } from 'react';
import '../Styles/AgendarCita.css';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
export default function AgendarCita(){
const navigate = useNavigate();

    
     const [citas, setCitas] = useState(() => {
        try {
            const guardadas = localStorage.getItem('citas');
            const parseadas = guardadas ? JSON.parse(guardadas) : [];
            
            return Array.isArray(parseadas) ? parseadas : [];
                } catch (e) 
                {
                    return [];
                }
            }
        );
   
 
    // Cargar del localStorage al iniciar
    useEffect(() => {
        
       //localStorage.removeItem('citas');
        const listaGuardada = localStorage.getItem('citas');
        console.log("Lista cargada:", listaGuardada);
       
        if (listaGuardada) {
        setCitas(JSON.parse(listaGuardada));
        }

        

    }, []);

    const handleRegistrarCita = () => {
    navigate("/Registro"); 
    }
  
    return(
        <div className="container-cita">
            <div className="container-banner">
                <h1>Agendar Cita</h1>
                
            </div>

            <div className="container-btn">
                <Button variant="contained" onClick={handleRegistrarCita} >Agregar Cita</Button>
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
                    {citas.map((cita) => (
                    <tr key={cita.id}>
                    <td style={tdStyle}>{cita.id}</td>
                    <td style={tdStyle}>{cita.nombre}</td>
                    <td style={tdStyle}>{cita.cedula || ''}</td>
                    <td style={tdStyle}>{cita.telefono || ''}</td>
                    <td style={tdStyle}>{cita.fecha || ''}</td>
                    <td style={tdStyle}>{cita.hora || ''}</td>
                    <td style={tdStyle}>{cita.motivo || ''}</td>
                    <td style={tdStyle}>{cita.nota || ''}</td>
              </tr>
            ))}
      </tbody>
    </table>
            </div>
        </div>
    );
}
const thStyle = {
  padding: "14px 16px",
  backgroundColor: "#f5f5f5",
  color: "#333",
  fontSize: "11px",
  fontWeight: "600",
  textAlign: "left",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
  borderBottom: "1px solid #ddd"
};

const tdStyle = {
  padding: "12px 16px",
  fontSize: "11px",
  color: "#444",
  borderBottom: "1px solid #eee",
  backgroundColor: "#fff"
};
