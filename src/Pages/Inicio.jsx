import React from "react";

import '../Styles/Inicio.css'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Inicio(){

    const navigate = useNavigate();

    const handleMenuPrincipal = () => {
    navigate("/AgendarCita"); 
    }
    return(
        <div>
            <div className="container-main">
                <h1>Odontologia</h1>
                <Button variant="contained" onClick={handleMenuPrincipal}>Continuar</Button>
            </div>
        </div>
    );
}