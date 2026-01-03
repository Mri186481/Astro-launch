import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
    <header className="main-header">
      <Link to="/" className="logo-link">
        <h1>AstroLaunch 🚀</h1>
      </Link>
  
      <nav className="main-nav">
        <Link to="/">Inicio</Link>
        {/* Aquí se pueden ir añadiendo mas links */}
        <Link to="/contact">Contacto</Link>
        
        <ThemeToggle />
      </nav>
    </header>
  );
}