import React from 'react';

const Footer: React.FC = () => {
  // Obtengo el año
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="page-container">
        <div className="footer-content">
          <p>
            © {currentYear} <strong>AstroLaunch 🚀</strong> - Grado Superior Desarrollo Multiplataforma. Diseño de
        Interfaces..
          </p>
          <p className="footer-tagline">
            Datos proporcionados por las APIs de SpaceX y la NASA.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;