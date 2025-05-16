// src/components/ExportarPDF.jsx
import React from 'react';
import { generarPDF } from '../utils/generarPDF';

const ExportarPDF = ({ datos, ejercicios, cantidadSesiones, modoProgresion }) => {
  const exportar = () => {
    generarPDF(datos, ejercicios, (doc) => doc.save('Progresion_Ejercicios.pdf'), cantidadSesiones, modoProgresion);
  };

  return (
    <button
      onClick={exportar}
      className="bg-[#264653] hover:bg-[#1e293b] text-white px-4 py-2 rounded-full transition"
    >
      Exportar a PDF
    </button>
  );
};

export default ExportarPDF;
