// src/App.jsx
import React, { useState } from 'react';
import TablaEjercicios from './components/TablaEjercicios';
import FormularioEjercicio from './components/FormulariosEjercicios';
import ExportarPDF from './utils/ExportarPDF';
import InputCorreo from './components/Inputcorreo';
import DatosPersonales from './components/DatosPersonales';
import Footer from './UI/Footer.jsx';
/* import Navbar from "./UI/Navbar.jsx"; */

function App() {
  const [datos, setDatos] = useState({ nombre: '', edad: '', peso: '', objetivo: '' });
  const [ejercicios, setEjercicios] = useState([]);

  const agregarFilaFija = (fila) => {
    setEjercicios(prev => {
      const index = prev.findIndex(e => e.ejercicio === fila.ejercicio);
      if (index !== -1) {
        const copia = [...prev];
        copia[index] = fila;
        return copia;
      } else {
        return [fila, ...prev];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow container mx-auto p-4">
        <DatosPersonales datos={datos} setDatos={setDatos} />
        <FormularioEjercicio onAgregar={(ej) => setEjercicios([...ejercicios, ej])} />
        <TablaEjercicios ejercicios={ejercicios} setEjercicios={setEjercicios} />
        <div className="flex justify-center gap-4 mt-6">
          <ExportarPDF datos={datos} ejercicios={ejercicios} />
          <InputCorreo datos={datos} ejercicios={ejercicios} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
