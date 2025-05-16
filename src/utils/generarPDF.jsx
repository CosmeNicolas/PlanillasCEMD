// src/utils/generarPDF.js
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../img/cemd-logo-1.png";
import bones from "../img/bones.png";
import happy from "../img/happy.png";
import neutral from "../img/neutral.png";

export const generarPDF = (
  datos,
  ejercicios,
  callback,
  cantidadSesiones = 12,
  modoProgresion = "lineal"
) => {
  const doc = new jsPDF({ orientation: "landscape" });

  const logoImg = new Image();
  logoImg.src = logo;

  logoImg.onload = function () {
    const logoWidth = 12;
    const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.addImage(
      logoImg,
      "PNG",
      pageWidth - logoWidth - 14,
      10,
      logoWidth,
      logoHeight
    );

    // 🧾 Datos personales
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("Apellido y Nombre: ", 14, 20);
    const nombreX = 14 + doc.getTextWidth("Apellido y Nombre: ");
    doc.setFont("helvetica", "bold");
    doc.text(`${datos.nombre}`, nombreX, 20);

    const edadLabel = " | Edad: ";
    const edadLabelX = nombreX + doc.getTextWidth(`${datos.nombre}`);
    doc.setFont("helvetica", "normal");
    doc.text(edadLabel, edadLabelX, 20);
    doc.setFont("helvetica", "bold");
    const edadValueX = edadLabelX + doc.getTextWidth(edadLabel);
    doc.text(`${datos.edad}`, edadValueX, 20);

    const pesoLabel = " | Peso: ";
    const pesoLabelX = edadValueX + doc.getTextWidth(`${datos.edad}`);
    doc.setFont("helvetica", "normal");
    doc.text(pesoLabel, pesoLabelX, 20);
    doc.setFont("helvetica", "bold");
    const pesoValueX = pesoLabelX + doc.getTextWidth(pesoLabel);
    doc.text(`${datos.peso} kg`, pesoValueX, 20);

    const alturaLabel = " | Altura: ";
    const alturaLabelX = pesoValueX + doc.getTextWidth(`${datos.peso} kg`);
    doc.setFont("helvetica", "normal");
    doc.text(alturaLabel, alturaLabelX, 20);
    doc.setFont("helvetica", "bold");
    const alturaValueX = alturaLabelX + doc.getTextWidth(alturaLabel);
    doc.text(`${datos.altura || "-"}`, alturaValueX, 20);

    const objetivoLabel = " | Objetivo: ";
    const objetivoLabelX =
      alturaValueX + doc.getTextWidth(`${datos.altura || "-"}`);
    doc.setFont("helvetica", "normal");
    doc.text(objetivoLabel, objetivoLabelX, 20);
    doc.setFont("helvetica", "bold");
    const objetivoValueX = objetivoLabelX + doc.getTextWidth(objetivoLabel);
    doc.text(`${datos.objetivo}`, objetivoValueX, 20);

    const fechaActual = new Date().toLocaleDateString("es-AR");
    const fechaLabel = " | Fecha de elaboración: ";
    const fechaLabelX = objetivoValueX + doc.getTextWidth(`${datos.objetivo}`);
    doc.setFont("helvetica", "normal");
    doc.text(fechaLabel, fechaLabelX, 20);
    doc.setFont("helvetica", "bold");
    const fechaValueX = fechaLabelX + doc.getTextWidth(fechaLabel);
    doc.text(`${fechaActual}`, fechaValueX, 20);

    // Tabla de ejercicios
    const sesionesValidas = Number(cantidadSesiones) || 12;
    const headers = [
      "Ejercicio",
      ...Array.from({ length: sesionesValidas }, (_, i) => `Día ${i + 1}`),
    ];

    const filaFechas = [
      "Fechas",
      ...Array.from({ length: sesionesValidas }, () => ""),
    ];

    const body = [
      filaFechas,
      ...ejercicios.map((e) => [
        e.ejercicio,
        ...(Array.isArray(e.sesiones)
          ? e.sesiones.slice(0, sesionesValidas)
          : []),
      ]),
    ];

    const fechaRowIndex = 0;

    // 🎨 Color de encabezado según el modo de progresión
    const encabezadoColor =
      modoProgresion === "combinada"
        ? [61, 31, 43] // RGB de #712a46
        : [42, 176, 161]; // RGB de #2AB0A1

    autoTable(doc, {
      startY: 28,
      head: [headers],
      body,
      styles: {
        fontSize: 10,
        halign: "center",
        valign: "middle",
        cellPadding: 2,
        lineColor: [200, 200, 200],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: encabezadoColor,
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        textColor: [50, 50, 50],
      },
      columnStyles: {
        0: { halign: "left" },
      },
      theme: "plain",
      didParseCell: function (data) {
        if (data.section === "head") return;
        if (data.row.index === fechaRowIndex) {
          data.cell.styles.fontStyle = "italic";
          data.cell.styles.fillColor = [230, 230, 230];
          data.cell.styles.textColor = [90, 90, 90];
        } else {
          const realIndex = data.row.index - 1;
          data.cell.styles.fillColor =
            realIndex % 2 === 1 ? [245, 245, 245] : [255, 255, 255];
        }
      },
    });

    // Escala de Borg
    const finalY = doc.lastAutoTable.finalY + 10;
    const centerX = doc.internal.pageSize.getWidth() / 2;
    const emojiSize = 4;

    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    const leyenda = "Escala de esfuerzo percibido";
    const leyendaWidth = doc.getTextWidth(leyenda);
    doc.text(leyenda, centerX - leyendaWidth / 2, finalY);

    const totalIcons = 3;
    const spacing = 40;
    const iconStartX = centerX - ((totalIcons - 1) * spacing) / 2;
    const iconY = finalY + 5;
    const labelY = iconY + 7;

    const drawIcon = (imgSrc, x, label) => {
      const img = new Image();
      img.src = imgSrc;
      doc.addImage(img, "PNG", x, iconY, emojiSize, emojiSize);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      const textWidth = doc.getTextWidth(label);
      doc.text(label, x + emojiSize / 2 - textWidth / 2, labelY + 3);
    };

    drawIcon(happy, iconStartX, "Liviano(1-5)");
    drawIcon(neutral, iconStartX + spacing, "Medio(6-7)");
    drawIcon(bones, iconStartX + spacing * 2, "Pesado(8-10)");

    // 📤 Final
    callback(doc);
  };
};
