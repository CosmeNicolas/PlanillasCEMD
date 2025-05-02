import { useState } from 'react';
import React from 'react';

const FormularioEjercicio = ({ onAgregar }) => {
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState('');
  const [series, setSeries] = useState('');
  const [repsIniciales, setRepsIniciales] = useState('');

  const ejerciciosPredefinidos = [
    "Sentadilla",
    "Press de banca",
    "Peso muerto",
    "Remo con barra",
    "Curl de bíceps",
    "Press militar",
    "Zancadas",
    "Plancha"
  ];

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!nombre || !peso || !series || !repsIniciales) {
      alert('Completa todos los campos correctamente');
      return;
    }

    const rep = parseInt(repsIniciales);
    const sesiones = [];
    let totalSesiones = 0;
    let r = rep;
    let pesoActual = parseFloat(peso);

    while (totalSesiones < 12) {
      sesiones.push(`${pesoActual}kg ${series}x${r}`);
      totalSesiones++;
      if (r >= 10 && totalSesiones < 12) {
        pesoActual += 2.5;
        r = rep;
      } else {
        r += 2;
      }
    }

    onAgregar({ ejercicio: nombre, sesiones });

    // Limpiar formulario
    setNombre('');
    setPeso('');
    setSeries('');
    setRepsIniciales('');
  };

  return (
    <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-lg font-semibold text-center mb-4 text-[#2AB0A1] dark:text-white">Cargar nuevo ejercicio</h3>
      <form onSubmit={manejarEnvio} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          list="ejercicios"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Ejercicio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Peso (kg)"
          min={1}
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          required
        />
        <input
          type="number"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Series"
          min={1}
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          required
        />
        <input
          type="number"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Reps iniciales"
          min={1}
          value={repsIniciales}
          onChange={(e) => setRepsIniciales(e.target.value)}
          required
        />
        <div className="md:col-span-4 flex justify-center">
          <button
            type="submit"
            className="bg-[#2AB0A1] hover:bg-[#218C85] text-white px-6 py-2 rounded-full transition font-semibold"
          >
            Agregar
          </button>
        </div>
      </form>

      <datalist id="ejercicios">
        {ejerciciosPredefinidos.map((e, idx) => (
          <option key={idx} value={e} />
        ))}
      </datalist>
    </div>
  );
};

export default FormularioEjercicio;
