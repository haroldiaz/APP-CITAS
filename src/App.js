import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Inicio from './Pages/Inicio';
import VerCita from './Pages/VerCitas';
import Registro from './Pages/Registro';
import ExportarPdf from './Pages/ExportarPdf';
import Citas from './Componentes/Citas';
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Inicio />} />
        <Route path="/AgendarCita" element={<VerCita />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Exportar" element={<ExportarPdf />} />
        <Route path="/citas" element={<Citas />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
