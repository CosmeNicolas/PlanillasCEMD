# Planilla de Progresión de Ejercicios

Aplicación web para crear y gestionar rutinas de entrenamiento personalizadas, pensada para entrenadores, gimnasios y centros de rehabilitación.

## Características

- Carga dinámica de ejercicios y sesiones (6 o 12)
- Filas fijas de **Entrada en Calor** y **Vuelta a la Calma**
- Selector automático de series, repeticiones y peso
- Soporte para ejercicios por tiempo (ej: *Plancha: 3x10''*)
- Exportación a PDF con logo (usando jsPDF + autoTable)
- Exportación e importación a Excel (SheetJS)
- Envío por correo con validación (Nodemailer + SweetAlert2)
- Responsive y con modo oscuro

## Tecnologías

- **Frontend**: Vite + React + Tailwind CSS
- **PDF**: jsPDF + autoTable
- **Excel**: SheetJS
- **Backend**: Node.js + Express + Nodemailer
- **Extras**: SweetAlert2, soporte para imágenes y logos

## Uso

1. Completar datos del alumno (nombre, edad, peso)
2. Agregar ejercicios y configurar su progresión
3. Personalizar tiempo de Entrada en Calor y Vuelta a la Calma
4. Exportar como PDF o Excel
5. Enviar por correo al alumno o contacto

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build
