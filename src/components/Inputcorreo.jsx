// src/components/InputCorreo.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { generarPDF } from '../utils/generarPDF';

const InputCorreo = ({ datos, ejercicios, cantidadSesiones }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const estiloSwal = {
    background: '#191825',
    color: '#FAF1E6',
    confirmButtonColor: '#2AB0A1',
    cancelButtonColor: '#E966A0',
  };

  const enviarCorreo = async () => {
    if (!email.includes('@')) {
      return Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Por favor ingresá un correo electrónico válido.',
        ...estiloSwal,
      });
    }

    setLoading(true);

    try {
      generarPDF(datos, ejercicios, async (doc) => {
        const pdfBlob = doc.output('blob');
        const formData = new FormData();
        formData.append('emailDestino', email);
        formData.append('pdf', pdfBlob, 'Planilla_Ejercicios.pdf');

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/correo/email`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Correo enviado',
            text: '✅ La planilla fue enviada con éxito.',
            ...estiloSwal,
          });
          setEmail('');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '❌ Ocurrió un error al enviar el correo.',
            ...estiloSwal,
          });
        }

        setLoading(false);
      }, cantidadSesiones); // ✅ PASAMOS LA CANTIDAD DE SESIONES AQUÍ
    } catch (error) {
      console.error('Error al enviar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: '❌ Hubo un problema al enviar el correo.',
        ...estiloSwal,
      });
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full sm:w-[300px] p-2 border-2 border-[#2AB0A1] rounded-full text-center text-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={enviarCorreo}
        disabled={loading}
        className={`bg-[#2AB0A1] text-white px-4 py-2 rounded-full transition flex items-center justify-center w-[180px] ${
          loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#218C85]'
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white mr-2"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : null}
        {loading ? 'Enviando...' : 'Enviar por Email'}
      </button>
    </div>
  );
};

export default InputCorreo;
