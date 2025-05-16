// src/components/FormularioEjercicio.jsx
import React, { useState } from 'react';

const FormularioEjercicio = ({
  onAgregar,
  cantidadSesiones,
  agregarFilaFija,
  modoProgresion,
  ejercicios,
  setEjercicios
}) => {
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState('');
  const [series, setSeries] = useState('');
  const [repsIniciales, setRepsIniciales] = useState('');
  const [entradaCalor, setEntradaCalor] = useState('');
  const [vueltaCalma, setVueltaCalma] = useState('');
  const [inicioEnSesion, setInicioEnSesion] = useState(1);
  const [incrementoPeso, setIncrementoPeso] = useState(2.5);

  const ejerciciosPredefinidos = ['Abdominales', 'Press de banca', 'Remo', 'Plancha', 'Triceps'];

  const isCombinada = modoProgresion === 'combinada';

  // 🎨 Colores dinámicos
  const bgColor = isCombinada ? 'bg-[#3D1F2B]' : 'bg-[#264653]';
  const borderColor = isCombinada ? 'border-[#6B4F66]' : 'border-[#2AB0A1]';
  const textColor = isCombinada ? 'text-white' : 'text-white';
  const buttonColor = isCombinada ? 'bg-[#6B4F66] hover:bg-[#593C51]' : 'bg-[#2AB0A1] hover:bg-[#218C85]';

  const manejarEnvio = (e) => {
    e.preventDefault();
    const isPlancha = nombre.toLowerCase().includes('plancha');
    if (!nombre || !series || (!peso && !isPlancha) || !repsIniciales) {
      alert('Faltan datos');
      return;
    }

    const sesiones = Array(cantidadSesiones).fill('');
    const s = parseInt(series);
    const incremento = parseFloat(incrementoPeso || 2.5);
    let p = parseFloat(peso);
    let r = parseInt(repsIniciales);
    let seg = parseInt(repsIniciales);

    if (modoProgresion === 'combinada') {
      const esImpar = ejercicios.length % 2 === 0;
      for (let i = 0; i < cantidadSesiones; i++) {
        const esPosicionImpar = i % 2 === 0;
        if ((esImpar && esPosicionImpar) || (!esImpar && !esPosicionImpar)) {
          sesiones[i] = isPlancha ? `${s}x${seg}''` : `${p}kg ${s}x${r}`;
          isPlancha ? (seg += 5) : (r >= 10 ? (p += incremento, r = parseInt(repsIniciales)) : (r += 2));
        }
      }
    } else {
      for (let i = inicioEnSesion - 1; i < cantidadSesiones; i++) {
        sesiones[i] = isPlancha ? `${s}x${seg}''` : `${p}kg ${s}x${r}`;
        isPlancha ? (seg += 5) : (r >= 10 ? (p += incremento, r = parseInt(repsIniciales)) : (r += 2));
      }
    }

    onAgregar((prev) => [...prev, { ejercicio: nombre, sesiones }]);
    setNombre('');
    setPeso('');
    setSeries('');
    setRepsIniciales('');
    setInicioEnSesion(1);
    setIncrementoPeso(2.5);
  };

  const agregarFija = (tipo, valor) => {
    agregarFilaFija({
      ejercicio: tipo,
      sesiones: Array(cantidadSesiones).fill(`${valor} min`)
    });
  };

  return (
    <div className={`p-6 rounded-xl shadow-md mb-6 border-l-4 ${bgColor} ${borderColor}`}>
      <h3 className={`text-lg font-semibold text-center ${textColor} mb-4`}>
        Cargar nuevo ejercicio
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={`text-sm font-semibold ${textColor}`}>Entrada en Calor</label>
          <select
            value={entradaCalor}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              setEntradaCalor(v);
              agregarFija('Entrada en Calor', v);
            }}
            className={`p-2 border ${borderColor} rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white`}
          >
            <option value="" disabled>Seleccionar tiempo</option>
            {[...Array(6)].map((_, i) => {
              const val = 5 + i;
              return <option key={val} value={val}>{val} min</option>;
            })}
          </select>
        </div>

        <div>
          <label className={`text-sm font-semibold ${textColor}`}>Vuelta a la Calma</label>
          <select
            value={vueltaCalma}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              setVueltaCalma(v);
              agregarFija('Vuelta a la Calma', v);
            }}
            className={`p-2 border ${borderColor} rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white`}
          >
            <option value="" disabled>Seleccionar tiempo</option>
            {[...Array(6)].map((_, i) => {
              const val = 5 + i;
              return <option key={val} value={val}>{val} min</option>;
            })}
          </select>
        </div>
      </div>

      <form onSubmit={manejarEnvio} className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <input type="text" list="ejercicios" value={nombre} onChange={(e) => setNombre(e.target.value)}
          placeholder="Ejercicio" className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white" required />
        {!nombre.toLowerCase().includes('plancha') && (
          <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)}
            placeholder="Peso (kg)" className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white" required />
        )}
        <input type="number" value={series} onChange={(e) => setSeries(e.target.value)}
          placeholder="Series" className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white" required />
        <input type="number" value={repsIniciales} onChange={(e) => setRepsIniciales(e.target.value)}
          placeholder="Repeticiones" className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white" required />
        <select value={inicioEnSesion} onChange={(e) => setInicioEnSesion(parseInt(e.target.value))}
          className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white">
          {Array.from({ length: cantidadSesiones }, (_, i) => (
            <option key={i} value={i + 1}>Desde sesión {i + 1}</option>
          ))}
        </select>
        {!nombre.toLowerCase().includes('plancha') && (
          <input type="number" value={incrementoPeso} onChange={(e) => setIncrementoPeso(e.target.value)}
            placeholder="Incremento peso" className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white" />
        )}
        <div className="md:col-span-6 flex justify-center">
          <button type="submit" className={`${buttonColor} text-white px-6 py-2 rounded-full font-semibold`}>
            Agregar
          </button>
        </div>
      </form>

      <datalist id="ejercicios">
        {ejerciciosPredefinidos.map((e, i) => (
          <option key={i} value={e} />
        ))}
      </datalist>
    </div>
  );
};

export default FormularioEjercicio;
