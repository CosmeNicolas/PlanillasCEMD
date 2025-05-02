import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
} from '@nextui-org/react';
import { Link, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon } from 'lucide-react';
import logo from '../img/cemd-logo-1.png';
import { useTheme } from 'next-themes';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

 /*  const menuItems = [
    { path: '/', name: 'Inicio' },
    { path: '/planilla', name: 'Planilla' },
    { path: '/contacto', name: 'Contacto' },
  ]; */

  return (
    <>
      <Navbar
        isBordered
        maxWidth="full"
        className="bg-[#2AB0A1] text-white dark:bg-[#1a4742] dark:text-white"
      >
        {/* LOGO */}
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <img className="w-10 h-10 rounded-full" src={logo} alt="Logo CEMD" />
            <span className="hidden sm:block text-xl font-bold">CEMD</span>
          </Link>
        </NavbarBrand>

        {/* LINKS CENTRADOS */}
        <NavbarContent className="hidden sm:flex flex-1 justify-center gap-6">
         {/*  {menuItems.map((item) => (
            <NavbarItem key={item.path} isActive={location.pathname === item.path}>
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-full transition-all ${
                  location.pathname === item.path
                    ? 'bg-white/10 text-white'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))} */}
        </NavbarContent>

        {/* BOTÓN DARK MODE */}
        <NavbarContent justify="end" className="hidden sm:flex">
          <Button
            isIconOnly
            size="sm"
            className="bg-transparent text-white hover:bg-white/10"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </Button>
        </NavbarContent>

        {/* TOGGLE MOBILE */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="sm:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </Navbar>
    </>
  );
};

export default NavBar;
