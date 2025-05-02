import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const DatosPersonales = ({ datos, setDatos }) => {
  const editarDatos = async () => {
    const { value: formValues } = await MySwal.fire({
      title: 'Editar Datos Personales',
      html:
        `<input id="swal-nombre" class="swal2-input" placeholder="Apellido y Nombre" value="${datos.nombre}" />` +
        `<input id="swal-edad" class="swal2-input" placeholder="Edad" value="${datos.edad}" type="number" />` +
        `<input id="swal-peso" class="swal2-input" placeholder="Peso" value="${datos.peso}" type="number" />` +
        `<input id="swal-objetivo" class="swal2-input" placeholder="Objetivo" value="${datos.objetivo}" />`,
      focusConfirm: false,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      background: '#191825',
      color: '#FAF1E6',
      confirmButtonColor: '#2AB0A1',
      cancelButtonColor: '#E966A0',
      preConfirm: () => {
        return {
          nombre: document.getElementById('swal-nombre').value,
          edad: document.getElementById('swal-edad').value,
          peso: document.getElementById('swal-peso').value,
          objetivo: document.getElementById('swal-objetivo').value,
        };
      }
    });

    if (formValues) {
      setDatos({
        nombre: formValues.nombre || datos.nombre,
        edad: formValues.edad || datos.edad,
        peso: formValues.peso || datos.peso,
        objetivo: formValues.objetivo || datos.objetivo,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl shadow-md mb-6 border-l-4 border-[#2AB0A1]">
      <p className="text-lg text-[#333] dark:text-white">
        Apellido y Nombre: <span className="font-bold">{datos.nombre}</span>
      </p>
      <p className="text-lg text-[#333] dark:text-white">
        Edad: <span className="font-bold">{datos.edad}</span>
      </p>
      <p className="text-lg text-[#333] dark:text-white">
        Peso: <span className="font-bold">{datos.peso}</span> kg
      </p>
      <p className="text-lg text-[#333] dark:text-white">
        Objetivo: <span className="font-bold">{datos.objetivo}</span>
      </p>
      <button
        onClick={editarDatos}
        className="mt-4 bg-[#2AB0A1] hover:bg-[#218C85] text-white px-6 py-2 rounded-full transition"
      >
        Editar Datos Personales
      </button>
    </div>
  );
};

export default DatosPersonales;
