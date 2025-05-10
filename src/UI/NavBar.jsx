import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button
} from '@nextui-org/react';
import { MoonIcon, SunIcon } from 'lucide-react';
import logo from '../img/cemd-logo-1.png';
import { useTheme } from 'next-themes';

const NavBar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Navbar
      isBordered
      maxWidth="full"
      className="bg-[#056157] text-white dark:bg-[#1a4742] dark:text-white py-2 "
    >
      {/* LOGO */}
      <NavbarBrand>
        <div className="flex items-center gap-2 cursor-default">
          <img className="w-10 h-10  rounded-full" src={logo} alt="Logo CEMD" />
          <span className="hidden sm:block text-xl font-semibold text-amber-50">CEMD</span>
        </div>
      </NavbarBrand>

      {/* DARK MODE TOGGLE */}
     {/*  <NavbarContent justify="end">
        <Button
          isIconOnly
          size="sm"
          className="bg-transparent text-white hover:bg-white/10"
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </Button>
      </NavbarContent> */}
    </Navbar>
  );
};

export default NavBar;
