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
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevasCitas);
    localStorage.setItem('citas', JSON.stringify(nuevasCitas));
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

  return (
     <AnimatedPage>
    <div className="container-cita">
      <div className="container-banner">
        <h1>Agendar Cita</h1>
      </div>

      <div className="container-btn">
        <Button 
          variant="contained" 
          onClick={handleRegistrarCita}
          style={{ minWidth: '40px', padding: '8px' }}
        >
          <AddIcon />
        </Button>
      </div>

      <div>
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
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 {/* Diálogo para editar */}
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
        <DialogTitle>Editar Cita</DialogTitle>
        <DialogContent
          dividers
          style={{
            padding: '32px',
            overflowY: 'auto',
            maxHeight: 'calc(100% - 100px)',
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
              <TextField
                label="Motivo"
                value={citaSeleccionada.motivo}
                onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, motivo: e.target.value })}
                fullWidth
              />
              <TextField
                label="Nota"
                value={citaSeleccionada.nota}
                onChange={(e) => setCitaSeleccionada({ ...citaSeleccionada, nota: e.target.value })}
                fullWidth
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
