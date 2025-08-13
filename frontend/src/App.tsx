import React from 'react'
import './App.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import InvestigadorComponent from './components/investigadores/InvestigadorComponent';
import DisponibilidadComponent from './components/disponibilidad/DisponibilidadComponent';
import GrupoComponent from './components/grupos/GrupoComponent';
import LineaComponent from './components/lineas/LineaComponent';

//estilo
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

export const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Sistema de Formación de Grupos de Investigación Colaborativa</div>} />
        <Route path="/investigadores" element={<InvestigadorComponent />} />
        <Route path="/lineas" element={<LineaComponent />} />
        <Route path="/disponibilidad" element={<DisponibilidadComponent />} />
        <Route path="/grupos" element={<GrupoComponent />} />
      </Routes>
    </Router>
  )
}

export default App;