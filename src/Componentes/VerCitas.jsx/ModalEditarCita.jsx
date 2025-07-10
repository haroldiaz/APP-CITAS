import React from "react";  
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import DialogActions from '@mui/material/DialogActions';

export default function ModalEditarCita({openDialog,setOpenDialog,citaSeleccionada,setCitaSeleccionada,handleGuardarEdicion}){
    return(
        <div>
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

        </div>
    );
}