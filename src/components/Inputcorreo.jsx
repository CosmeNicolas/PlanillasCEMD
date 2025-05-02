import React from 'react'

// src/components/InputCorreo.jsx
import { useState } from 'react';

const InputCorreo = () => {
  const [email, setEmail] = useState('');

  const enviarCorreo = () => {
    if (!email.includes('@')) {
      alert('Por favor ingresá un correo válido.');
      return;
    }

    // Aquí iría el fetch a tu backend para enviar el archivo o datos
    alert(`📨 Enviaríamos la planilla a: ${email}`);
    setEmail('');
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full sm:w-[300px] p-2 border-2 border-[#2AB0A1] rounded-full text-center text-sm" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={enviarCorreo}
        className="bg-[#2AB0A1] hover:bg-[#218C85] text-white px-4 py-2 rounded-full transition"
      >
        Enviar por Email
      </button>
    </div>
  );
};

export default InputCorreo;
