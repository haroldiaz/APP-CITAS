import React, { useState, useEffect } from 'react';
import '../Styles/AgendarCita.css';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import AnimatedPage from '../Componentes/AnimatePage';
import { motion, AnimatePresence } from 'framer-motion';
import DenseAppBar  from '../Componentes/DenseAppBar.jsx';
export default function AgendarCita() {
  const navigate = useNavigate();

  const [citas, setCitas] = useState(() => {
    try {
      const guardadas = localStorage.getItem('citas');
      const parseadas = guardadas ? JSON.parse(guardadas) : [];
      return Array.isArray(parseadas) ? parseadas : [];
    } catch (e) {
      return [];
    }
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const citasPorPagina = 5;
  const [filaEliminando, setFilaEliminando] = useState(null);

  useEffect(() => {
    const listaGuardada = localStorage.getItem('citas');
    if (listaGuardada) {
      setCitas(JSON.parse(listaGuardada));
    }
  }, []);

  const handleRegistrarCita = () => {
    navigate("/Registro");
  };

  const handleEliminar = (id) => {
    setFilaEliminando(id);
    setTimeout(() => {
      const nuevasCitas = citas.filter((cita) => cita.id !== id);
      setCitas(nuevasCitas);
      localStorage.setItem('citas', JSON.stringify(nuevasCitas));
      setFilaEliminando(null);
    }, 300);
  };

  const handleEditar = (cita) => {
    setCitaSeleccionada(cita);
    setOpenDialog(true);
  };

  const handleGuardarEdicion = () => {
    const citasActualizadas = citas.map((cita) =>
      cita.id === citaSeleccionada.id ? citaSeleccionada : cita
    );
    setCitas(citasActualizadas);
    localStorage.setItem('citas', JSON.stringify(citasActualizadas));
    setOpenDialog(false);
  };

  const totalPaginas = Math.ceil(citas.length / citasPorPagina);
  const citasPaginadas = citas.slice((paginaActual - 1) * citasPorPagina, paginaActual * citasPorPagina);

  return (
    <AnimatedPage>
       <DenseAppBar name="Agendar Cita"></DenseAppBar >
      <div className="container-cita">
        
        <div className="container-btn">
          <Button 
            variant="contained" 
            onClick={handleRegistrarCita}
            style={{ minWidth: '40px', padding: '8px' }}
          >
            <AddIcon />
          </Button>
        </div>

        <div className="tabla-container">
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
                <th style={thStyle}>Acción</th>
              </tr>
            </thead>
            <AnimatePresence component="tbody">
              <tbody>
                {citasPaginadas.map((cita) => (
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
                    <td style={tdStyle}>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small" 
                        onClick={() => handleEliminar(cita.id)}
                      >
                        Eliminar
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small" 
                        onClick={() => handleEditar(cita)} 
                        style={{ marginLeft: '8px' }}
                      >
                        Editar
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>

          {citas.length > citasPorPagina && (
            <div className="paginacion">
              {[...Array(totalPaginas)].map((_, i) => (
                <Button
                  key={i}
                  onClick={() => setPaginaActual(i + 1)}
                  variant={paginaActual === i + 1 ? "contained" : "outlined"}
                  size="small"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              width: '100%',
              height: '90vh',
              maxWidth: '900px',
              overflow: 'hidden',
            }
          }}
        >
          <DialogTitle style={{ backgroundColor: "rgb(222, 234, 244)" }}>
            Editar Cita
          </DialogTitle>
          <DialogContent
            dividers
            style={{
              padding: '32px',
              overflowY: 'auto',
              maxHeight: 'calc(100% - 100px)',
              maxWidth: '600px',
              width: '600px',
              height: '600px',
            }}
          >
            {citaSeleccionada && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <TextField
                  label="Nombre"
                  value={citaSeleccionada.nombre}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, nombre: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Cédula"
                  value={citaSeleccionada.cedula}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, cedula: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Teléfono"
                  value={citaSeleccionada.telefono}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, telefono: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Fecha"
                  type="date"
                  value={citaSeleccionada.fecha}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, fecha: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Hora"
                  type="time"
                  value={citaSeleccionada.hora}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, hora: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">Cancelar</Button>
            <Button onClick={handleGuardarEdicion} variant="contained" color="primary">Guardar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </AnimatedPage>
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
