// src/components/FormularioEjercicio.jsx
import React, { useState } from 'react';

const FormularioEjercicio = ({ onAgregar, cantidadSesiones = 12, agregarFilaFija }) => {
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState('');
  const [incrementoPeso, setIncrementoPeso] = useState(2);
  const [series, setSeries] = useState('');
  const [repsIniciales, setRepsIniciales] = useState('');
  const [entradaCalor, setEntradaCalor] = useState(5);
  const [vueltaCalma, setVueltaCalma] = useState(5);

  const ejerciciosPredefinidos = [
    "Abdominales", "Elevaciones de tronco", "Prensa 40º", "Prensa horizontal",
    "Flexores", "Press de banca", "Remo", "Pantorrilas",
    "Biceps Combinados", "Biceps", "Triceps", "Plancha"
  ];

  const manejarEnvio = (e) => {
    e.preventDefault();
    const isPlancha = nombre.toLowerCase().includes('plancha');
    if (!nombre || !series || (!peso && !isPlancha) || !repsIniciales) {
      alert('Por favor completá todos los campos');
      return;
    }

    const sesiones = [];
    const s = parseInt(series);
    let total = 0;

    if (isPlancha) {
      let segundos = parseInt(repsIniciales);
      while (total < cantidadSesiones) {
        sesiones.push(`${s}x${segundos}''`);
        segundos += 5;
        total++;
      }
    } else {
      let r = parseInt(repsIniciales);
      let p = parseFloat(peso);
      const incremento = parseFloat(incrementoPeso) || 2.5;

      while (total < cantidadSesiones) {
        sesiones.push(`${p}kg ${s}x${r}`);
        total++;
        if (r >= 10 && total < cantidadSesiones) {
          p += incremento;
          r = parseInt(repsIniciales);
        } else {
          r += 2;
        }
      }
    }

    onAgregar({ ejercicio: nombre, sesiones });
    setNombre(''); setPeso(''); setSeries(''); setRepsIniciales('');
  };

  const agregarFija = (tipo, valor) => {
    agregarFilaFija({
      ejercicio: tipo,
      sesiones: Array(cantidadSesiones).fill(`${valor} min`)
    });
  };

  return (
    <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-lg font-semibold text-center mb-4 text-[#2AB0A1] dark:text-white">
        Cargar nuevo ejercicio
      </h3>

      {/* Entrada en Calor y Vuelta a la Calma */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-[#2AB0A1] dark:text-white font-semibold mb-1 text-sm">
            Entrada en Calor
          </label>
          <select
            value={entradaCalor}
            onChange={(e) => {
              const valor = parseInt(e.target.value);
              setEntradaCalor(valor);
              agregarFija('Entrada en Calor', valor);
            }}
            className="p-2 border border-[#2AB0A1] rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
          >
            {[...Array(6)].map((_, i) => {
              const val = 5 + i;
              return <option key={val} value={val}>{val} min</option>;
            })}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[#2AB0A1] dark:text-white font-semibold mb-1 text-sm">
            Vuelta a la Calma
          </label>
          <select
            value={vueltaCalma}
            onChange={(e) => {
              const valor = parseInt(e.target.value);
              setVueltaCalma(valor);
              agregarFija('Vuelta a la Calma', valor);
            }}
            className="p-2 border border-[#2AB0A1] rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
          >
            {[...Array(6)].map((_, i) => {
              const val = 5 + i;
              return <option key={val} value={val}>{val} min</option>;
            })}
          </select>
        </div>
      </div>

      {/* Formulario dinámico */}
      <form onSubmit={manejarEnvio} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Ejercicio */}
        <input
          type="text"
          list="ejercicios"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Ejercicio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        {/* Peso con datalist */}
        {!nombre.toLowerCase().includes('plancha') && (
          <>
            <input
              type="number"
              list="pesosFrecuentes"
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Peso (kg)"
              min={0}
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
            />
            <datalist id="pesosFrecuentes">
              {[5, 10, 15, 20, 25, 30, 35, 40].map((val) => (
                <option key={val} value={val} />
              ))}
            </datalist>

            {/* Incremento */}
            <input
              type="number"
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Incremento (kg)"
              min={0}
              value={incrementoPeso}
              onChange={(e) => setIncrementoPeso(e.target.value)}
            />
          </>
        )}

        {/* Series */}
        <select
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          required
        >
          <option value="">Series</option>
          <option value="2">2 series</option>
          <option value="3">3 series</option>
          <option value="4">4 series</option>
        </select>

        {/* Reps o Segundos */}
        <input
          type="number"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder={nombre.toLowerCase().includes('plancha') ? "Segundos" : "Reps iniciales"}
          min={1}
          value={repsIniciales}
          onChange={(e) => setRepsIniciales(e.target.value)}
          required
        />

        <div className="md:col-span-5 flex justify-center">
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
