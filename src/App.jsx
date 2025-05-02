import React, { useState } from 'react';
import DatosPersonales from './components/DatosPersonales';
import FormularioEjercicio from './components/FormulariosEjercicios';
import AccionesPlanilla from './components/AccionesPlanilla';
import InputCorreo from './components/Inputcorreo';
import TablaEjercicios from './components/TablaEjercicios';

import Footer from './UI/Footer';
import NavBar from './UI/NavBar';

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
    <div className="bg-[#F4F4F4] dark:bg-[#121212] text-black dark:text-white min-h-screen transition-colors duration-300">
      <NavBar />

      <main className="py-6 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#2AB0A1] dark:text-[#4BE3D5] mb-6">
         Progresión de Ejercicios 🏋🏽‍♂️
        </h1>

        <DatosPersonales datos={datos} setDatos={setDatos} />
        <FormularioEjercicio onAgregar={agregarEjercicio} />
        <TablaEjercicios ejercicios={ejercicios} setEjercicios={setEjercicios} />
        <AccionesPlanilla datos={datos} ejercicios={ejercicios} setEjercicios={setEjercicios} />
        <InputCorreo />
      </main>
    <Footer/>
    </div>
  );
};

export default App;
