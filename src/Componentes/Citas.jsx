// src/Componentes/Citas.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Citas() {
  const [citas, setCitas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [estado, setEstado] = useState('en espera');

  const obtenerCitas = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/citas');
      setCitas(res.data);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  };

  const crearCita = async () => {
    try {
      await axios.post('http://localhost:3001/api/citas', {
        nombre,
        fecha,
        hora,
        estado
      });
      setNombre('');
      setFecha('');
      setHora('');
      setEstado('en espera');
      obtenerCitas();
    } catch (error) {
      console.error('Error al crear cita:', error);
    }
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Citas</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />
      <button onClick={crearCita}>Agendar</button>

      <ul>
        {citas.map((cita) => (
          <li key={cita.id}>
            {cita.nombre} - {cita.fecha} - {cita.hora} - {cita.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}
