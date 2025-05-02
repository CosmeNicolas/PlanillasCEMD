import { useState } from 'react';
import React from 'react';

const FormularioEjercicio = ({ onAgregar }) => {
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState('');
  const [series, setSeries] = useState('');
  const [repsIniciales, setRepsIniciales] = useState('');

  const ejerciciosPredefinidos = [
    "Abdominales",
    'Elevaciones de tronco',
    'Prensa 40º',
    'Prensa horizontal',
    'Flexores',
    "Press de banca",
    "Remo",
    "Pantorrilas",
    "Biceps Combinados",
    "Biceps",
    "Triceps",
    "Plancha"
  ];

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!nombre || !series || (!peso && !nombre.toLowerCase().includes('plancha')) || !repsIniciales) {
      alert('Completa todos los campos correctamente');
      return;
    }

    const sesiones = [];
    let totalSesiones = 0;
    const s = parseInt(series);
    const isPlancha = nombre.toLowerCase().includes('plancha');

    if (isPlancha) {
      let segundos = parseInt(repsIniciales);
      while (totalSesiones < 12) {
        sesiones.push(`${s}x${segundos}''`);
        segundos += 5;
        totalSesiones++;
      }
    } else {
      let r = parseInt(repsIniciales);
      let pesoActual = parseFloat(peso);

      while (totalSesiones < 12) {
        sesiones.push(`${pesoActual}kg ${s}x${r}`);
        totalSesiones++;
        if (r >= 10 && totalSesiones < 12) {
          pesoActual += 2.5;
          r = parseInt(repsIniciales);
        } else {
          r += 2;
        }
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
        {!nombre.toLowerCase().includes('plancha') && (
          <input
            type="number"
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Peso (kg)"
            min={1}
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        )}
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
          placeholder={nombre.toLowerCase().includes('plancha') ? "Segundos" : "Reps iniciales"}
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