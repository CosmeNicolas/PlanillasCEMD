// src/components/TablaEjercicios.jsx
import React from 'react';

const TablaEjercicios = ({ ejercicios, setEjercicios, cantidadSesiones, modoProgresion }) => {
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

  // 🎨 Estilos condicionales por modo
  const isCombinada = modoProgresion === 'combinada';

  const colorCabecera = isCombinada ? '#3D1F2B' : '#2AB0A1';
  const bgFilaPar = isCombinada ? 'bg-[#3D1F2B] dark:bg-[#3D1F2B]' : 'bg-gray-50 dark:bg-[#2c2c2c]';
  const bgFilaImpar = isCombinada ? 'bg-[#3D1F2B] dark:bg-[#3D1F2B]' : 'dark:bg-[#1f1f1f]';

  const headers = [
    'Ejercicio',
    ...Array.from({ length: cantidadSesiones }, (_, i) => `Sesión ${i + 1}`),
    'Eliminar',
  ];

  return (
    <div className="overflow-x-auto p-4 rounded-xl shadow-md mb-6 bg-white dark:bg-[#1f1f1f]">
      <table className="w-full text-sm text-center border-collapse">
        <thead>
          <tr style={{ backgroundColor: colorCabecera }} className="text-white text-xs md:text-sm">
            {headers.map((h, i) => (
              <th key={i} className="p-2 border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ejercicios.map((fila, i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? bgFilaPar : bgFilaImpar}`}
            >
              <td className="border p-1">
                <input
                  type="text"
                  className="w-full bg-transparent text-center text-[#333] dark:text-white font-bold tracking-wide focus:outline-none"
                  value={fila.ejercicio}
                  onChange={(e) => actualizarCelda(i, 0, e.target.value)}
                />
              </td>
              {Array.from({ length: cantidadSesiones }, (_, j) => (
                <td key={j} className="border p-1">
                  <input
                    type="text"
                    className="w-full bg-transparent text-center text-[#333] dark:text-white font-bold tracking-wide focus:outline-none"
                    value={fila.sesiones[j] || ''}
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
