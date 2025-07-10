// TablaCitas.jsx
import React from 'react';
import { Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

export default function TablaCitas({ citas, onEliminar, onEditar, filaEliminando }) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Nombre</th>
          <th style={thStyle}>Cédula</th>
          <th style={thStyle}>Teléfono</th>
          <th style={thStyle}>Fecha</th>
          <th style={thStyle}>Hora</th>
          <th style={thStyle}>Motivo</th>
          <th style={thStyle}>Nota</th>
          <th style={thStyle}>Estado</th>
          <th style={thStyle}>Acción</th>
        </tr>
      </thead>
      <AnimatePresence component="tbody">
        <tbody>
          {citas.map((cita) => (
            <motion.tr
              key={cita.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: filaEliminando === cita.id ? 0.95 : 1,
                backgroundColor: filaEliminando === cita.id ? "#ffe6e6" : "#fff",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              exit={{
                opacity: 0,
                height: 0,
                scale: 0.95,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              style={{ overflow: "hidden", borderRadius: "10px" }}
            >
              <td style={tdStyle}>{cita.id}</td>
              <td style={tdStyle}>{cita.nombre}</td>
              <td style={tdStyle}>{cita.cedula}</td>
              <td style={tdStyle}>{cita.telefono}</td>
              <td style={tdStyle}>{cita.fecha}</td>
              <td style={tdStyle}>{cita.hora}</td>
              <td style={tdStyle}>{cita.motivo}</td>
              <td style={tdStyle}>{cita.nota}</td>
              <td style={tdStyle}>{cita.estado || 'En espera'}</td>
              <td style={tdStyle}>
                <Button variant="outlined" color="error" size="small" onClick={() => onEliminar(cita)}>Eliminar</Button>
                <Button variant="outlined" color="primary" size="small" onClick={() => onEditar(cita)} style={{ marginLeft: '8px' }}>Editar</Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </AnimatePresence>
    </table>
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
