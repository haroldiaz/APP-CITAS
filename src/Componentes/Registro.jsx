import React, { useState, useEffect } from 'react';
import '../Styles/Registro.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import DenseAppBar from './DenseAppBar';

// Variable del componente
const alertaError = (
  <Alert
    variant="outlined"
    icon={<CheckIcon fontSize="inherit" />}
    severity="error"
  >
    No ingreso un valor valido
  </Alert>
  
);
export default function Registro() {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const [error, setError] = useState(false);
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');

  const [citas, setCitas] = useState(() => {
    try {
      const guardadas = localStorage.getItem('citas');
      const parseadas = guardadas ? JSON.parse(guardadas) : [];
      return Array.isArray(parseadas) ? parseadas : [];
    } catch (e) {
      return [];
    }
  });
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [nota ,setNota] = useState('');
  const nuevoId =
    citas.length > 0 ? Math.max(...citas.map((c) => c.id)) + 1 : 1;

  const agregarCita = (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || cedula.trim() === '') return;

    const cedulaNum = Number(cedula);
    if (!Number.isInteger(cedulaNum)) {
      console.log("No es un entero la cédula");
     activarError();
      return;
    }

    const nuevaCita = {
      id: nuevoId,
      nombre,
      cedula: parseInt(cedula),
      telefono,
      fecha,
      hora,
      motivo,
      nota
    };

    const nuevaLista = [...citas, nuevaCita];
    setCitas(nuevaLista);
    localStorage.setItem('citas', JSON.stringify(nuevaLista));

    setNombre('');
    setCedula('');
    setTelefono('');
    setMotivo('');
    setNota('');
    
    activarAlert();
  };

  useEffect(() => {
    setMostrarAlerta(false);
    const listaGuardada = localStorage.getItem('citas');
    if (listaGuardada) {
      setCitas(JSON.parse(listaGuardada));
    }
  }, []);

  const activarAlert = () => {
    setMostrarAlerta(true);
    setTimeout(() => setMostrarAlerta(false), 3000);
  };

  const activarError = () => {
    setError(true);
    setTimeout(() => setError(false), 3000);
  }

  return (
   <div>
    <DenseAppBar name="Registro Cita"></DenseAppBar>
  
    <div className="container-registro">

      <div className="container-formulario">
        <form onSubmit={agregarCita}>
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              label="Cédula"
              variant="outlined"
              fullWidth
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <TextField
            label="Fecha de la Cita"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          <TextField
            label="Hora de la Cita"
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
              label="Motivo"
              variant="outlined"
              fullWidth
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
           <TextField
              label="Nota"
              variant="outlined"
              fullWidth
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Registrar Cita
            </Button>
          </Stack>
        </form>
      </div>

      <div style={{ marginTop: '20px' }}>
        {mostrarAlerta && (
          <Alert
            variant="outlined"
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
          >
            ¡Se registró la cita con éxito!
          </Alert>
        )}
        { error && (alertaError)
          
        }
      </div>
    </div>
     </div>
  );
}
