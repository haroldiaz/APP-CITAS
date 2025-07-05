import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Inicio from './Pages/Inicio';
import AgendarCita from './Pages/AgendarCita';
import Registro from './Componentes/Registro';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Inicio />} />
        <Route path="/AgendarCita" element={<AgendarCita />} />
        <Route path="/Registro" element={<Registro />} />
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
