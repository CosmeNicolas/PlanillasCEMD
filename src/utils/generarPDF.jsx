// src/utils/generarPDF.jsx
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../img/cemd-logo-1.png';

export const generarPDF = (datos, ejercicios, callback, cantidadSesiones = 12) => {
  const doc = new jsPDF({ orientation: 'landscape' });

  const logoImg = new Image();
  logoImg.src = logo;

  logoImg.onload = function () {
    const logoWidth = 30;
    const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
    const pageWidth = doc.internal.pageSize.getWidth();

    // 👉 Logo alineado a la derecha
    doc.addImage(logoImg, 'PNG', pageWidth - logoWidth - 14, 10, logoWidth, logoHeight);

    // 👉 Datos personales a la izquierda
    doc.setFontSize(12);
    doc.setTextColor('#333333');
    doc.text(`Apellido y Nombre: ${datos.nombre}`, 14, 15);
    doc.text(`Edad: ${datos.edad}`, 14, 22);
    doc.text(`Peso: ${datos.peso} kg`, 14, 29);
    doc.text(`Objetivo: ${datos.objetivo}`, 14, 36);

    // 🧾 Cabecera de la tabla
    const sesionesValidas = Number(cantidadSesiones) || 12;
    const headers = ['Ejercicio', ...Array.from({ length: sesionesValidas }, (_, i) => `S${i + 1}`)];

    // 🧩 Cuerpo de la tabla
    const body = ejercicios.map(e => [
      e.ejercicio,
      ...(Array.isArray(e.sesiones) ? e.sesiones.slice(0, sesionesValidas) : [])
    ]);

    // 📋 Generar tabla con estilo mejorado
    autoTable(doc, {
      startY: 50,
      head: [headers],
      body,
      styles: {
        fontSize: 10,                // ✅ Tamaño de letra mayor
        halign: 'center',
        valign: 'middle',
        cellPadding: 4,             // ✅ Más espacio en celdas
        lineColor: [200, 200, 200],
        lineWidth: 0.2
      },
      headStyles: {
        fillColor: [42, 176, 161],   // ✅ Verde institucional
        textColor: 255,
        fontStyle: 'bold',          // ✅ Títulos en negrita
        halign: 'center'
      },
      bodyStyles: {
        textColor: [50, 50, 50]      // ✅ Texto gris oscuro
      },
      columnStyles: {
        0: { halign: 'left' }        // ✅ "Ejercicio" alineado a la izquierda
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]   // ✅ Filas alternadas para lectura
      },
      theme: 'grid'
    });

    callback(doc);
  };
};
