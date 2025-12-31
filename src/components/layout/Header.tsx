import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="main-header">
      {/* Logo / Título */}
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
        AstroLaunch 🚀
      </h1>

      {/* Navegación */}
      <nav>
        <NavLink 
          to="/"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Inicio
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;