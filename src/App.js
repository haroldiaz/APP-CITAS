
import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import AgendarCita from './Pages/AgendarCita';
import Registro from './Componentes/Registro';
function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/a" element={<AgendarCita />} />
          <Route path="/" element={<Registro />} />
        </Routes>
      </Router>
       </div>
  );
}

export default App;
