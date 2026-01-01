import { useState, useEffect } from "react";

export default function ThemeToggle() {
  // Inicio el estado leyendo de localStorage. 
  // Si no hay nada, por defecto será 'dark'.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  //Cada vez que el tema cambie, actualizamos el body y el localStorage
  //Se necesita un efecto secundario(useEffect), para una vez que se dispare
  //este useEffect aunque no es territorio React le ponemos una clase a body que es el padre de react en index.html
  useEffect(() => {
    if (theme === "light") {
    // Escribo a mano la clase en el body del index.html
    //Orden en Javascript Puro. 
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
    //Al ponerle la clase al body el css cascada hace el resto
    //Body es elemento padre todos los demas la heredan
    //es decir en CSS sino hay clase se usa el valor root si hay clase se usa body.light-mode
    localStorage.setItem("theme", theme);
  }, [theme]);

  //Función para alternar entre uno y otro
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "1px solid var(--accent-color)",
        color: "var(--text-primary)",
        padding: "0.5rem 1rem",
        borderRadius: "20px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "0.8rem"
      }}
    >
      {theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
    </button>
  );
}