import React, { useState, useEffect } from 'react';
import '../Styles/Registro.css'
import { circularProgressClasses } from '@mui/material/CircularProgress';

 export default function Registro(){
 
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
 
   const [citas, setCitas] = useState(() => {
  try {
    const guardadas = localStorage.getItem('citas');
    const parseadas = guardadas ? JSON.parse(guardadas) : [];
    return Array.isArray(parseadas) ? parseadas : [];
  } catch (e) {
    return [];
  }
});
const nuevoId = citas.length > 0
    ? Math.max(...citas.map(c => c.id)) + 1
    : 1;
    const agregarCita = (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || edad.trim() === '') return;

    
    
    const nuevaCita = {
      id:nuevoId, // ID único
      nombre,
      edad: parseInt(edad)

    };
    const nuevaLista = [...citas, nuevaCita];
   

    setCitas(nuevaLista);
    console.log(nuevaLista);
    localStorage.setItem('citas', JSON.stringify(nuevaLista));

    setNombre('');
    setEdad('');
    }
    
    // Cargar del localStorage al iniciar
    useEffect(() => {
        
       //localStorage.removeItem('citas');
        const listaGuardada = localStorage.getItem('citas');
        console.log("Lista cargada:", listaGuardada);
       
        if (listaGuardada) {
        setCitas(JSON.parse(listaGuardada));
        }

        

    }, []);

        return (
            <div className="container-registro">
                
                <div className="container-banner">
                <h1>Registro de Cita</h1>
                </div>
              
                <div className="container-formulario">
                    <form onSubmit={agregarCita}>
                        <div className="inputs">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Escribe tu nombre"
                            />
                        </div>
                        <div className="inputs">
                            <label>Documento:</label>
                            <input 
                                type="text" 
                                name="Nombre"
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                                placeholder='Escribe tu edad'
                            />
                        </div>
                       
                         <button type="submit" onClick={agregarCita}>Registrar Cita</button>
                    </form>
                </div>
            </div>
        );
    }