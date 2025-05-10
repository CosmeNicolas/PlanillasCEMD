// src/components/ui/Footer.jsx
import React from 'react';
/* import { Link } from 'react-router-dom'; */
import { Image } from '@nextui-org/react';
import logo from '../img/cemd-logo-1.png';

const Footer = () => {
  return (
    <footer className="bg-[#056157] dark:bg-[#1a4742] text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Logo CEMD"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-semibold text-lg">CEMD</span>
        </div>


        <p className="text-sm text-white/80 text-center md:text-right">
          © {new Date().getFullYear()} CEMD. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
