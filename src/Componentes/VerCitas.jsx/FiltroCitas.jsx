
import React from 'react';
import { TextField, Select, MenuItem, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

export default function FiltroCitas({ filtroNombre, setFiltroNombre, filtroFecha, setFiltroFecha, filtroEstado, setFiltroEstado }) {
    const navigate = useNavigate();

    const handleRegistrarCita = () => {
    navigate("/Registro");
    };

    return (
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
        width: '800px'
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
      <Select
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
        displayEmpty
        size="small"
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">Todos los estados</MenuItem>
        <MenuItem value="En espera">En espera</MenuItem>
        <MenuItem value="Completado">Completado</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleRegistrarCita}>
        <AddIcon />
      </Button>
    </Paper>
  );
}
