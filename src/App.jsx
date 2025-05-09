// src/App.jsx
import React, { useState } from 'react';
import TablaEjercicios from './components/TablaEjercicios';

import ExportarPDF from './utils/ExportarPDF';
import InputCorreo from './components/InputCorreo';
import DatosPersonales from './components/DatosPersonales';
import Footer from './UI/Footer';
import FormularioEjercicios from './components/FormulariosEjercicios';

function App() {
  const [datos, setDatos] = useState({ nombre: '', edad: '', peso: '', objetivo: '' });
  const [ejercicios, setEjercicios] = useState([]);
  const [cantidadSesiones, setCantidadSesiones] = useState(6);

  const agregarFilaFija = (fila) => {
    setEjercicios((prev) => {
      const index = prev.findIndex((e) => e.ejercicio === fila.ejercicio);
      if (index !== -1) {
        const copia = [...prev];
        copia[index] = fila;
        return copia;
      }
      return [fila, ...prev];
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-[#343434] text-gray-900 dark:text-white">
      <main className="flex-grow container mx-auto p-4">
        <DatosPersonales datos={datos} setDatos={setDatos} />

        <div className="flex justify-center items-center gap-4 mb-6">
          <label className="text-[#2AB0A1] font-semibold">
            Cantidad de sesiones:
          </label>
          <select
            value={cantidadSesiones}
            onChange={(e) => setCantidadSesiones(parseInt(e.target.value))}
            className="p-2 border border-[#2AB0A1] rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
          >
            <option value={6}>6 sesiones</option>
            <option value={12}>12 sesiones</option>
          </select>
        </div>

        <FormularioEjercicios
          onAgregar={(callback) => setEjercicios((prev) => callback(prev))}
          cantidadSesiones={cantidadSesiones}
          agregarFilaFija={agregarFilaFija}
        />

        <TablaEjercicios
          ejercicios={ejercicios}
          setEjercicios={setEjercicios}
          cantidadSesiones={cantidadSesiones}
        />

        <div className="flex justify-center gap-4 mt-6">
          <ExportarPDF
            datos={datos}
            ejercicios={ejercicios}
            cantidadSesiones={cantidadSesiones}
          />
          <InputCorreo
            datos={datos}
            ejercicios={ejercicios}
            cantidadSesiones={cantidadSesiones}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
