import React from 'react'
import { useState } from 'react';
import DatosPersonales from './components/DatosPersonales';
import FormularioEjercicio from './components/FormulariosEjercicios';
import AccionesPlanilla from './components/AccionesPlanilla';
import InputCorreo from './components/Inputcorreo';
import TablaEjercicios from './components/TablaEjercicios'

const App = () => {
  const [datos, setDatos] = useState({
    nombre: 'John Doe',
    edad: '30',
    peso: '75',
    objetivo: 'Aumentar fuerza',
  });

  const [ejercicios, setEjercicios] = useState([]);

  const agregarEjercicio = (nuevo) => {
    setEjercicios([...ejercicios, nuevo]);
  };
  

  return (
    <div className="bg-[#F4F4F4] min-h-screen py-6">
      <h1 className="text-3xl font-bold text-center text-[#2AB0A1] mb-6">
        Planilla de Progresión de Ejercicios
      </h1>
      <DatosPersonales datos={datos} setDatos={setDatos} />
      {/* Aca irán los otros componentes */}
      <FormularioEjercicio onAgregar={agregarEjercicio} />
      <TablaEjercicios ejercicios={ejercicios} setEjercicios={setEjercicios} />
      <AccionesPlanilla
        datos={datos}
        ejercicios={ejercicios}
        setEjercicios={setEjercicios}
      />
      <InputCorreo />
    </div>
  );
}

export default App;