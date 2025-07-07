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
import DenseAppBar from '../Componentes/DenseAppBar.jsx';
import Paper from '@mui/material/Paper';

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
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  // Confirmación eliminación
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [citaParaEliminar, setCitaParaEliminar] = useState(null);

  useEffect(() => {
    const listaGuardada = localStorage.getItem('citas');
    if (listaGuardada) {
      setCitas(JSON.parse(listaGuardada));
    }
  }, []);

  const handleRegistrarCita = () => {
    navigate("/Registro");
  };

  const confirmarEliminar = (cita) => {
    setCitaParaEliminar(cita);
    setOpenConfirmDialog(true);
  };

  const confirmarEliminacion = () => {
    setOpenConfirmDialog(false);
    setFilaEliminando(citaParaEliminar.id);
    setTimeout(() => {
      const nuevasCitas = citas.filter((cita) => cita.id !== citaParaEliminar.id);
      setCitas(nuevasCitas);
      localStorage.setItem('citas', JSON.stringify(nuevasCitas));
      setFilaEliminando(null);
      setCitaParaEliminar(null);
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

  const citasFiltradas = citas.filter((cita) => {
    const coincideNombre = cita.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideFecha = filtroFecha === '' || cita.fecha === filtroFecha;
    return coincideNombre && coincideFecha;
  });

  const totalPaginas = Math.ceil(citasFiltradas.length / citasPorPagina);

  const citasPaginadas = citasFiltradas.slice(
    (paginaActual - 1) * citasPorPagina,
    paginaActual * citasPorPagina
  );

  return (
    <AnimatedPage>
      <DenseAppBar name="Agendar Cita" />
      <div className="container-cita">

        {/* FILTROS */}
        <Paper
          elevation={2}
          sx={{
            padding: 2,
            marginTop: 6,
            marginBottom: 4,
            borderRadius: 2,
            backgroundColor: '#f9f9f9',
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
            width: '600px'
          }}
        >
          <TextField
            label="Filtrar por nombre"
            variant="outlined"
            size="small"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
          <TextField
            label="Filtrar por fecha"
            type="date"
            variant="outlined"
            size="small"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            onClick={handleRegistrarCita}
            style={{ minWidth: '40px', padding: '8px' }}
          >
            <AddIcon />
          </Button>
        </Paper>

        {/* TABLA */}
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
                        onClick={() => confirmarEliminar(cita)}
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

          {totalPaginas > 1 && (
            <div className="paginacion" style={{ marginTop: "16px" }}>
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

        {/* MODAL EDICIÓN */}
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

        {/* MODAL CONFIRMAR ELIMINACIÓN */}
        <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
          <DialogTitle>¿Estás seguro que deseas eliminar esta cita?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">Cancelar</Button>
            <Button onClick={confirmarEliminacion} color="error" variant="contained">Eliminar</Button>
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
