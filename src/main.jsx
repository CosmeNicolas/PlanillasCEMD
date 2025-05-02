import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // ✅ importante
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </NextThemesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
