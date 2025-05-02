// src/App.jsx
import React, { useState } from 'react';
import FilaFija from './components/FilaFija';
import TablaEjercicios from './components/TablaEjercicios';
import FormularioEjercicio from './components/FormulariosEjercicios';
import ExportarPDF from './utils/ExportarPDF';
import InputCorreo from './components/Inputcorreo';
import DatosPersonales from './components/DatosPersonales';

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
    <div className="container mx-auto p-4">
      <DatosPersonales datos={datos} setDatos={setDatos} />
      <FilaFija titulo="Entrada en Calor" onAgregarFila={agregarFilaFija} />
      <FilaFija titulo="Vuelta a la Calma" onAgregarFila={agregarFilaFija} />
      <FormularioEjercicio onAgregar={(ej) => setEjercicios([...ejercicios, ej])} />
      <TablaEjercicios ejercicios={ejercicios} setEjercicios={setEjercicios} />
      <div className="flex justify-center gap-4">
        <ExportarPDF datos={datos} ejercicios={ejercicios} />
        <InputCorreo datos={datos} ejercicios={ejercicios} />
      </div>
    </div>
  );
}

export default App;
