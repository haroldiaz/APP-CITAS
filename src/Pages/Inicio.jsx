import React from "react";

import '../Styles/Inicio.css'
import Button from '@mui/material/Button';

export default function Inicio(){
    return(
        <div>
            <div className="container-main">
                <h1>Odontologia</h1>
                <Button variant="contained">Continuar</Button>
            </div>
        </div>
    );
}