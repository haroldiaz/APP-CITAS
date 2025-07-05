import React, { useState, useEffect } from 'react';
import '../Styles/Registro.css'
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

import Alert from '@mui/material/Alert';
 export default function Registro(){
 
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');

    //crea una lista
    const [citas, setCitas] = useState(() => {
    try {
        const guardadas = localStorage.getItem('citas');
        const parseadas = guardadas ? JSON.parse(guardadas) : [];
        
        return Array.isArray(parseadas) ? parseadas : [];
            } catch (e) 
            {
                return [];
            }
        }
    );

    const nuevoId = citas.length > 0
    ? Math.max(...citas.map(c => c.id)) + 1
    : 1;
    const agregarCita = (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || cedula.trim() === '') return;

    
    
    const nuevaCita = {
      id:nuevoId, // ID único
      nombre,
      cedula: parseInt(cedula),
      telefono

    };
    const nuevaLista = [...citas, nuevaCita];
   

    setCitas(nuevaLista);
    console.log(nuevaLista);
    localStorage.setItem('citas', JSON.stringify(nuevaLista));

    setNombre('');
    setCedula('');
    setTelefono('');
    activarAlert();
    }
    
    // Cargar del localStorage al iniciar
    useEffect(() => {
        
         setMostrarAlerta(false);
      // localStorage.removeItem('citas');
        const listaGuardada = localStorage.getItem('citas');
        console.log("Lista cargada:", listaGuardada);
       
        if (listaGuardada) {
        setCitas(JSON.parse(listaGuardada));
        }

        

    }, []);

    const activarAlert = () => {
   
    setMostrarAlerta(true);

    // Opcional: ocultar la alerta después de unos segundos
    setTimeout(() => setMostrarAlerta(false), 3000);
  };
        return (
            <div className="container-registro">
                
                <div className="cont-banner">
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
                            <label>Cedula:</label>
                            <input 
                                type="text" 
                                name="Cedula"
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                placeholder='Escribe tu Cedula'
                            />
                        </div>
                        <div className="inputs">
                            <label>Telefono:</label>
                            <input 
                                type="text" 
                                name="Telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                placeholder='Escribe tu Telefono'
                            />
                        </div>
                       
                         <Button variant='contained' type="submit" onClick={agregarCita}>Registrar Cita</Button>
                    </form>
                    
                </div>
            <div>
                 {mostrarAlerta && (
                    <Alert variant="outlined" icon={<CheckIcon fontSize="inherit" />} severity="success">
                    ¡Se registro la cita con exito!
                    </Alert>
                     )}
            </div>
            </div>

        );
    }