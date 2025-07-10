import React, { useState, useEffect } from 'react';
import '../Styles/AgendarCita.css';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import AnimatedPage from '../Componentes/AnimatePage.js';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Componentes/Navbar.jsx';

import FiltroCitas from '../Componentes/VerCitas.jsx/FiltroCitas.jsx';
import TablaCitas from '../Componentes/VerCitas.jsx/TablaCitas.jsx';

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
  const [filtroEstado, setFiltroEstado] = useState('');
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
    const coincideEstado = filtroEstado === '' || (cita.estado || 'En espera') === filtroEstado;
    return coincideNombre && coincideFecha && coincideEstado;
  });

  const totalPaginas = Math.ceil(citasFiltradas.length / citasPorPagina);

  const citasPaginadas = citasFiltradas.slice(
    (paginaActual - 1) * citasPorPagina,
    paginaActual * citasPorPagina
  );

  return (
    <AnimatedPage>
      <Navbar title="Citas" />
      <div className="container-cita">
        <FiltroCitas filtroNombre={filtroNombre}
        setFiltroNombre={setFiltroNombre}
        filtroFecha={filtroFecha}
        setFiltroFecha={setFiltroFecha}
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
        >

      </FiltroCitas>

        {citasFiltradas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', color: '#444' }}>No tienes ninguna cita registrada</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegistrarCita}
              startIcon={<AddIcon />}
            >
              Agendar Cita
            </Button>
          </div>
        ) : (
          <div className="tabla-container">
            <TablaCitas citas= {citas} onEliminar={confirmarEliminar} onEditar={handleEditar} filaEliminando={confirmarEliminacion}>
              
            </TablaCitas>

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
        )}

        {/* MODAL EDICIÓN */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle style={{ backgroundColor: "rgb(222, 234, 244)" }}>
            Editar Cita
          </DialogTitle>
          <DialogContent dividers style={{ padding: '32px' }}>
            {citaSeleccionada && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <TextField label="Nombre" value={citaSeleccionada.nombre} onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, nombre: e.target.value })} fullWidth />
                <TextField label="Cédula" value={citaSeleccionada.cedula} onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, cedula: e.target.value })} fullWidth />
                <TextField label="Teléfono" value={citaSeleccionada.telefono} onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, telefono: e.target.value })} fullWidth />
                <TextField label="Fecha" type="date" value={citaSeleccionada.fecha} onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, fecha: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} />
                <TextField label="Hora" type="time" value={citaSeleccionada.hora} onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, hora: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} />
                <Select
                  label="Estado"
                  value={citaSeleccionada.estado || 'En espera'}
                  onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, estado: e.target.value })}
                  fullWidth
                >
                  <MenuItem value="En espera">En espera</MenuItem>
                  <MenuItem value="Completado">Completado</MenuItem>
                </Select>
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
