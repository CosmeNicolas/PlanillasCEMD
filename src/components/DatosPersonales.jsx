import React from 'react';
// src/components/DatosPersonales.jsx
import { useState } from 'react';

const DatosPersonales = ({ datos, setDatos }) => {
  const editarDatos = () => {
    const nombre = prompt('Apellido y Nombre:', datos.nombre);
    const edad = prompt('Edad:', datos.edad);
    const peso = prompt('Peso:', datos.peso);
    const objetivo = prompt('Objetivo:', datos.objetivo);

    setDatos({
      nombre: nombre || datos.nombre,
      edad: edad || datos.edad,
      peso: peso || datos.peso,
      objetivo: objetivo || datos.objetivo,
    });
  };

  return (
    <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl shadow-md mb-6 border-l-4 border-[#2AB0A1]">
      <p className="text-lg text-[#333] dark:text-white">
        Apellido y Nombre: <span className="font-bold">{datos.nombre}</span>
      </p>
      <p className="text-lg text-[#333] dark:text-white">
        Edad: <span className="font-bold">{datos.edad}</span>
      </p>
      <p className="text-lg text-[#333] dark:text-white">
        Peso: <span className="font-bold">{datos.peso}</span> kg
      </p>
      <p className="text-lg text-[#333] dark:text-white">
        Objetivo: <span className="font-bold">{datos.objetivo}</span>
      </p>
      <button
        onClick={editarDatos}
        className="mt-4 bg-[#2AB0A1] hover:bg-[#218C85] text-white px-6 py-2 rounded-full transition"
      >
        Editar Datos Personales
      </button>
    </div>
  );
};

export default DatosPersonales;
