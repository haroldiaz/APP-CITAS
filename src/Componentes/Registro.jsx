import React, { useState, useEffect } from 'react';
import '../Styles/Registro.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import DenseAppBar from './DenseAppBar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Registro() {
  const [mostrarSnackbar, setMostrarSnackbar] = useState(false);

  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [nota, setNota] = useState('');

  const [errores, setErrores] = useState({});

  const [citas, setCitas] = useState(() => {
    try {
      const guardadas = localStorage.getItem('citas');
      const parseadas = guardadas ? JSON.parse(guardadas) : [];
      return Array.isArray(parseadas) ? parseadas : [];
    } catch (e) {
      return [];
    }
  });

  const nuevoId = citas.length > 0 ? Math.max(...citas.map((c) => c.id)) + 1 : 1;

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (nombre.trim() === '') nuevosErrores.nombre = 'El nombre es obligatorio';
    if (cedula.trim() === '') {
      nuevosErrores.cedula = 'La cédula es obligatoria';
    } else if (!/^\d+$/.test(cedula)) {
      nuevosErrores.cedula = 'La cédula debe ser un número entero';
    }

    if (telefono.trim() === '') nuevosErrores.telefono = 'El teléfono es obligatorio';
    if (fecha.trim() === '') nuevosErrores.fecha = 'La fecha es obligatoria';
    if (hora.trim() === '') nuevosErrores.hora = 'La hora es obligatoria';
    if (motivo.trim() === '') nuevosErrores.motivo = 'El motivo es obligatorio';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const agregarCita = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

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
    setFecha('');
    setHora('');
    setMotivo('');
    setNota('');
    setErrores({});
    setMostrarSnackbar(true); // Mostrar el snackbar
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setMostrarSnackbar(false);
  };

  useEffect(() => {
    const listaGuardada = localStorage.getItem('citas');
    if (listaGuardada) {
      setCitas(JSON.parse(listaGuardada));
    }
  }, []);

  return (
    <div>
      <DenseAppBar name="Registro Cita" />

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
                error={!!errores.nombre}
                helperText={errores.nombre}
              />
              <TextField
                label="Cédula"
                variant="outlined"
                fullWidth
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                error={!!errores.cedula}
                helperText={errores.cedula}
              />
              <TextField
                label="Teléfono"
                variant="outlined"
                fullWidth
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                error={!!errores.telefono}
                helperText={errores.telefono}
              />
              <TextField
                label="Fecha de la Cita"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                error={!!errores.fecha}
                helperText={errores.fecha}
              />
              <TextField
                label="Hora de la Cita"
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                error={!!errores.hora}
                helperText={errores.hora}
              />
              <TextField
                label="Motivo"
                variant="outlined"
                fullWidth
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                error={!!errores.motivo}
                helperText={errores.motivo}
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

        {/* SNACKBAR DE ÉXITO */}
        <Snackbar
          open={mostrarSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            ¡Se registró la cita con éxito!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
