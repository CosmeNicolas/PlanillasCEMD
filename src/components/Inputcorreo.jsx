import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from '@nextui-org/react';
import { generarPDF } from '../utils/generarPDF';

const InputCorreo = ({ datos, ejercicios }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarCorreo = async () => {
    if (!email.includes('@')) {
      alert('Por favor ingresá un correo válido.');
      return;
    }

    setLoading(true);

    try {
      generarPDF(datos, ejercicios, async (doc) => {
        const pdfBlob = doc.output('blob');

        const formData = new FormData();
        formData.append('emailDestino', email);
        formData.append('pdf', pdfBlob, 'Planilla_Ejercicios.pdf');

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/correo/enviar-email`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          alert('✅ Correo enviado con éxito');
          setEmail('');
        } else {
          alert('❌ Error al enviar el correo');
        }

        setLoading(false);
      });
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('❌ Hubo un problema al enviar el correo');
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
        className="bg-[#2AB0A1] hover:bg-[#218C85] text-white px-4 py-2 rounded-full transition flex items-center justify-center w-[180px]"
      >
        {loading ? <Spinner size="sm" color="white" /> : 'Enviar por Email'}
      </button>
    </div>
  );
};

export default InputCorreo;
