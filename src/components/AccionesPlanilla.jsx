// src/components/AccionesPlanilla.jsx
import React from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Import directo
import logo from '../img/cemd-logo-1.png';

const AccionesPlanilla = ({ datos, ejercicios, setEjercicios }) => {
  const exportarExcel = () => {
    const headers = ["Ejercicio", ...Array.from({ length: 12 }, (_, i) => `Sesión ${i + 1}`)];
    const filas = ejercicios.map(e => [e.ejercicio, ...e.sesiones]);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["Apellido y Nombre", datos.nombre],
      ["Edad", datos.edad],
      ["Peso", datos.peso],
      ["Objetivo", datos.objetivo],
      [],
      headers,
      ...filas,
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "Progresión");
    XLSX.writeFile(wb, "Progresion_Ejercicios.xlsx");
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logo;

    img.onload = () => {
      const logoWidth = 40;
      const logoHeight = (img.height / img.width) * logoWidth;
      const x = (doc.internal.pageSize.getWidth() - logoWidth) / 2;

      doc.addImage(img, 'PNG', x, 10, logoWidth, logoHeight);
      doc.setFontSize(12);
      doc.setTextColor('#2AB0A1');
      doc.text("Planilla de Progresión de Ejercicios", 14, 20 + logoHeight);
      doc.setTextColor('#333333');
      doc.text(`Apellido y Nombre: ${datos.nombre}`, 14, 30 + logoHeight);
      doc.text(`Edad: ${datos.edad}`, 14, 37 + logoHeight);
      doc.text(`Peso: ${datos.peso} kg`, 14, 44 + logoHeight);
      doc.text(`Objetivo: ${datos.objetivo}`, 14, 51 + logoHeight);

      const headers = ["Ejercicio", ...Array.from({ length: 12 }, (_, i) => `S${i + 1}`)];
      const body = ejercicios.map(e => [e.ejercicio, ...e.sesiones]);

      // ✅ Usar autoTable pasando el doc como primer argumento
      autoTable(doc, {
        startY: 60 + logoHeight,
        head: [headers],
        body,
        styles: { fontSize: 8, halign: 'right' },
        headStyles: {
          fillColor: [42, 176, 161],
          textColor: 255,
        },
      });

      doc.save("Progresion_Ejercicios.pdf");
    };
  };

  const importarExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = evt => {
      const data = new Uint8Array(evt.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const nuevasFilas = [];
      for (let i = 6; i < json.length; i++) {
        const row = json[i];
        if (row.length >= 13) {
          nuevasFilas.push({ ejercicio: row[0], sesiones: row.slice(1, 13) });
        }
      }

      setEjercicios(nuevasFilas);
      alert("Importación completa. Revisá los datos.");
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 items-center mb-6">
      <button
        onClick={exportarExcel}
        className="bg-[#2AB0A1] hover:bg-[#218C85] text-white px-4 py-2 rounded-full transition"
      >
        Exportar a Excel
      </button>

      <button
        onClick={exportarPDF}
        className="bg-[#2AB0A1] hover:bg-[#218C85] text-white px-4 py-2 rounded-full transition"
      >
        Exportar a PDF
      </button>

      <div>
        <input
          type="file"
          id="fileInput"
          accept=".xlsx,.xls"
          onChange={importarExcel}
          className="hidden"
        />
        <button
          onClick={() => document.getElementById('fileInput').click()}
          className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
        >
          Importar desde Excel
        </button>
      </div>
    </div>
  );
};

export default AccionesPlanilla;
