    import React from "react";  
import '../Styles/Registro.css'
    export default function Registro(){
        return (
            <div className="container-registro">
                
                <div className="container-banner">
                <h1>Registro de Cita</h1>
                </div>
              
                <div className="container-formulario">
                    <form action="">
                        <div className="inputs">
                            <label>Nombre:</label>
                            <input type="text" name="Nombre"/>
                        </div>
                       <div className="inputs">
                            <label>Documento:</label>
                            <input type="text" name="Nombre"/>
                        </div>
                        <div className="inputs">
                            <label>Telefono:</label>
                            <input type="text" name="Nombre"/>
                        </div>
                         <button type="submit">Registrar Cita</button>
                    </form>
                </div>
            </div>
        );
    }