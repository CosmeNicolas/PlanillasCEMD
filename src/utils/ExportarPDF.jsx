import React from 'react';
import { generarPDF } from '../utils/generarPDF';

const ExportarPDF = ({ datos, ejercicios }) => {
  const exportarPDF = () => {
    generarPDF(datos, ejercicios, (doc) => {
      doc.save('Progresion_Ejercicios.pdf');
    });
  };

  return (
    <button
      onClick={exportarPDF}
      className="bg-[#2AB0A1] hover:bg-[#218C85] text-white px-4 py-2 rounded-full transition"
    >
      Exportar a PDF
    </button>
  );
};

export default ExportarPDF;
