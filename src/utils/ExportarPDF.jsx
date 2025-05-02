// src/components/ExportarPDF.jsx
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import correcto para usar como función
import logo from '../img/cemd-logo-1.png';

const ExportarPDF = ({ datos, ejercicios }) => {
  const exportarPDF = () => {
    const doc = new jsPDF();
  
    const logoImg = new Image();
    logoImg.src = logo;
  
    logoImg.onload = function () {
      const logoWidth = 40;
      const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
      const pageWidth = doc.internal.pageSize.getWidth();
      const x = (pageWidth - logoWidth) / 2;
  
      doc.addImage(logoImg, 'PNG', x, 10, logoWidth, logoHeight);
      doc.setFontSize(12);
      doc.setTextColor('#2AB0A1');
      doc.text('Planilla de Progresión de Ejercicios', 14, 20 + logoHeight);
      doc.setTextColor('#333333');
      doc.text(`Apellido y Nombre: ${datos.nombre}`, 14, 30 + logoHeight);
      doc.text(`Edad: ${datos.edad}`, 14, 37 + logoHeight);
      doc.text(`Peso: ${datos.peso} kg`, 14, 44 + logoHeight);
      doc.text(`Objetivo: ${datos.objetivo}`, 14, 51 + logoHeight);
  
      const headers = ['Ejercicio', ...Array.from({ length: 12 }, (_, i) => `S${i + 1}`)];
      const body = ejercicios.map(e => [e.ejercicio, ...e.sesiones]);
  
      // Ejecutar autoTable después de que la imagen cargó
      autoTable(doc, {
        startY: 60 + logoHeight,
        head: [headers],
        body: body,
        styles: { fontSize: 8, halign: 'center' },
        headStyles: {
          fillColor: [42, 176, 161],
          textColor: 255,
        },
      });
  
      doc.save('Progresion_Ejercicios.pdf');
    };
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
