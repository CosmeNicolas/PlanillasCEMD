// src/components/TablaEjercicios.jsx
import React from 'react';

const TablaEjercicios = ({ ejercicios, setEjercicios }) => {
  const eliminarFila = (index) => {
    const nuevaLista = ejercicios.filter((_, i) => i !== index);
    setEjercicios(nuevaLista);
  };

  const actualizarCelda = (indexFila, indexColumna, valor) => {
    const nuevaLista = [...ejercicios];
    if (indexColumna === 0) {
      nuevaLista[indexFila].ejercicio = valor;
    } else {
      nuevaLista[indexFila].sesiones[indexColumna - 1] = valor;
    }
    setEjercicios(nuevaLista);
  };

  const headers = ["Ejercicio", ...Array.from({ length: 12 }, (_, i) => `Sesión ${i + 1}`), "Eliminar"];

  return (
    <div className="overflow-x-auto bg-white dark:bg-[#1f1f1f] p-4 rounded-xl shadow-md mb-6">
      <table className="w-full text-sm text-center border-collapse">
        <thead>
          <tr className="bg-[#2AB0A1] text-white text-xs md:text-sm">
            {headers.map((h, i) => (
              <th key={i} className="p-2 border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ejercicios.map((fila, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-gray-50 dark:bg-[#2c2c2c]" : "dark:bg-[#1f1f1f]"}>
              <td className="border p-1">
                <input
                  className="w-full bg-transparent text-center text-[#333] dark:text-white font-semibold focus:outline-none"
                  type="text"
                  value={fila.ejercicio}
                  onChange={(e) => actualizarCelda(i, 0, e.target.value)}
                />
              </td>
              {fila.sesiones.map((s, j) => (
                <td key={j} className="border p-1">
                  <input
                    type="text"
                    className="w-full bg-transparent text-center text-[#333] dark:text-white font-semibold focus:outline-none"
                    value={s}
                    onChange={(e) => actualizarCelda(i, j + 1, e.target.value)}
                  />
                </td>
              ))}
              <td className="border p-1">
                <button
                  onClick={() => eliminarFila(i)}
                  className="text-red-600 hover:text-red-800 text-lg"
                  title="Eliminar"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEjercicios;
