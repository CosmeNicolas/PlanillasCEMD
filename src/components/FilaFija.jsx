// src/components/FilaFija.jsx
import { useEffect, useState } from 'react';
import React from 'react';
const FilaFija = ({ titulo, onAgregarFila }) => {
  const [valor, setValor] = useState(5);

  useEffect(() => {
    const sesiones = Array(12).fill(`${valor} min`);
    onAgregarFila({ ejercicio: titulo, sesiones });
  }, [valor]);

  return (
    <div className="mb-4 flex justify-center items-center gap-4">
      <span className="text-[#2AB0A1] font-semibold">{titulo}</span>
      <select
        value={valor}
        onChange={(e) => setValor(parseInt(e.target.value))}
        className="p-2 border border-[#2AB0A1] rounded-lg bg-white dark:bg-gray-800 text-[#333] dark:text-white"
      >
        {[...Array(6)].map((_, i) => {
          const v = 5 + i;
          return (
            <option key={v} value={v}>{v} min</option>
          );
        })}
      </select>
    </div>
  );
};

export default FilaFija;
