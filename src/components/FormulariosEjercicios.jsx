import React, { useState } from 'react';

const FormularioEjercicio = ({ onAgregar, cantidadSesiones, agregarFilaFija }) => {
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState('');
  const [series, setSeries] = useState('');
  const [repsIniciales, setRepsIniciales] = useState('');
  const [entradaCalor, setEntradaCalor] = useState('');
  const [vueltaCalma, setVueltaCalma] = useState('');
  const [inicioEnSesion, setInicioEnSesion] = useState(1);
  const [incrementoPeso, setIncrementoPeso] = useState(2.5);

  const ejerciciosPredefinidos = ['Abdominales', 'Press de banca', 'Remo', 'Plancha', 'Triceps'];

  const manejarEnvio = (e) => {
    e.preventDefault();
    const isPlancha = nombre.toLowerCase().includes('plancha');
    if (!nombre || !series || (!peso && !isPlancha) || !repsIniciales) {
      alert('Faltan datos');
      return;
    }

    const sesiones = Array(cantidadSesiones).fill('');
    const s = parseInt(series);

    if (isPlancha) {
      let seg = parseInt(repsIniciales);
      for (let i = inicioEnSesion - 1; i < cantidadSesiones; i++) {
        sesiones[i] = `${s}x${seg}''`;
        seg += 5;
      }
    } else {
      let p = parseFloat(peso);
      let r = parseInt(repsIniciales);
      for (let i = inicioEnSesion - 1; i < cantidadSesiones; i++) {
        sesiones[i] = `${p}kg ${s}x${r}`;
        if (r >= 10 && i < cantidadSesiones - 1) {
          p += parseFloat(incrementoPeso);
          r = parseInt(repsIniciales);
        } else {
          r += 2;
        }
      }
    }

    const nuevaFila = { ejercicio: nombre, sesiones };

    onAgregar((prev) => {
      const copia = [...prev];
      const ultima = copia[copia.length - 1];
      if (ultima && inicioEnSesion > 1) {
        for (let i = inicioEnSesion - 1; i < cantidadSesiones; i++) {
          ultima.sesiones[i] = sesiones[i];
        }
        ultima.ejercicio += ` / ${nombre}`;
        return copia;
      }
      return [...prev, nuevaFila];
    });

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
      sesiones: Array(cantidadSesiones).fill(`${valor} min`),
    });
  };

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-[#1f1f1f] shadow-md mb-6 border-l-4 border-[#2AB0A1]">
      <h3 className="text-lg font-semibold text-center text-[#2AB0A1] mb-4 dark:text-white">Cargar nuevo ejercicio</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-semibold text-[#2AB0A1] dark:text-white">Entrada en Calor</label>
          <select
            value={entradaCalor}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              setEntradaCalor(v);
              agregarFija('Entrada en Calor', v);
            }}
            className="p-2 border border-[#2AB0A1] rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
          >
            <option value="" disabled>Seleccionar tiempo</option>
            {[...Array(6)].map((_, i) => {
              const val = 5 + i;
              return <option key={val} value={val}>{val} min</option>;
            })}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-[#2AB0A1] dark:text-white">Vuelta a la Calma</label>
          <select
            value={vueltaCalma}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              setVueltaCalma(v);
              agregarFija('Vuelta a la Calma', v);
            }}
            className="p-2 border border-[#2AB0A1] rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
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
        <input
          type="text"
          list="ejercicios"
          placeholder="Ejercicio"
          className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        {!nombre.toLowerCase().includes('plancha') && (
          <input
            type="number"
            placeholder="Peso (kg)"
            className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        )}
        <input
          type="number"
          placeholder="Series"
          className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder={nombre.toLowerCase().includes('plancha') ? "Segundos" : "Reps iniciales"}
          className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
          value={repsIniciales}
          onChange={(e) => setRepsIniciales(e.target.value)}
          required
        />
        <select
          value={inicioEnSesion}
          onChange={(e) => setInicioEnSesion(parseInt(e.target.value))}
          className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
        >
          {Array.from({ length: cantidadSesiones }, (_, i) => (
            <option key={i} value={i + 1}>Desde sesión {i + 1}</option>
          ))}
        </select>
        {!nombre.toLowerCase().includes('plancha') && (
          <input
            type="number"
            placeholder="Incremento peso"
            step="0.5"
            min="0.5"
            className="p-2 border rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
            value={incrementoPeso}
            onChange={(e) => setIncrementoPeso(e.target.value)}
          />
        )}

        <div className="md:col-span-6 flex justify-center">
          <button
            type="submit"
            className="bg-[#2AB0A1] hover:bg-[#218C85] text-white font-semibold px-6 py-2 rounded-full"
          >
            Agregar
          </button>
        </div>
      </form>

      <datalist id="ejercicios">
        {ejerciciosPredefinidos.map((e, i) => <option key={i} value={e} />)}
      </datalist>
    </div>
  );
};

export default FormularioEjercicio;
