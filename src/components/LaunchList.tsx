import { useEffect, useState } from "react";
import type { Launch } from "../types";
import { API_ENDPOINTS } from "../services/SpaceXAPI";
import LaunchCard from "./LaunchCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import SearchControls from "./SearchControls";


export default function LaunchList() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //Añado dos estados mas para busqueda y ordenacion
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  //Añado otro estado: "all", "success" o "failure"
  const [filterStatus, setFilterStatus] = useState("all");
  


  useEffect(() => {
    // Usamos la constante importada para la URL
    fetch(API_ENDPOINTS.LAUNCHES)
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data: Launch[]) => {
        // Guardamos los datos y quitamos el estado de carga
        setLaunches(data);
        setLoading(false);
        // Para probar el spinner simulo que la conexión tarda 8 segundos
        // setTimeout(() => {
        //   setLaunches(data);
        //   setLoading(false);
        // }, 8000); 
      })
      .catch(() => {
        setError("No se pudieron cargar los lanzamientos de SpaceX 🚀");
        setLoading(false);
      });
  }, []);

  // Si está cargando..
  if (loading) return <LoadingSpinner />;
  
  // Si hay error..
  if (error) return <ErrorMessage message={error} />;

    //Procesamiento de datos

  // 1. Empiezo con todos los datos
  let resultado = launches;
  //filter modifica el array resultado despues de haberlo recorrido elemento a elemento
  // 2. Filtrado combinado por nombre y Estado
  resultado = resultado.filter(lanzamiento => {
    //convierto el nombre del cohete como lo que el usuario ha escrito a minusculas
    const nombreEnMinusculas = lanzamiento.name.toLowerCase();
    const busquedaEnMinusculas = searchTerm.toLowerCase();
    //includes pregunta si una cadena de texto esta dentro de otra
    const coincideNombre = nombreEnMinusculas.includes(busquedaEnMinusculas);
    
    //Lógica de Estado, si es success, failure o por defecto all
    let coincideEstado = true;
    if (filterStatus === "success") {
      coincideEstado = lanzamiento.success === true;
    } else if (filterStatus === "failure") {
      coincideEstado = lanzamiento.success === false;
    }
    //El lanzamiento debe cumplir AMBAS condiciones
    //el return si devuelve true: el lanzamiento se guarada en la nueva lista si false se decarta
    return coincideNombre && coincideEstado;
    
  });

// 3. Ordeno el resultado del filtro
  resultado.sort((a, b) => {
    //convierto la fecha a numero, los milisegundos que han pasado desde el año 1970
    const tiempoA = new Date(a.date_utc).getTime();
    const tiempoB = new Date(b.date_utc).getTime();

    if (sortOrder === "asc") {
      return tiempoA - tiempoB; // El numero mas pequeño(fechas mas vieja) va primero
    } else {
      return tiempoB - tiempoA; // El numero mas grande(fecha mas reciente) va primero
    }
  });

// 4. Guardo el resultado final
const filteredLaunches = resultado;


  
  return (
    <section>
      {/* Componente de búsqueda pasamos estados de busqueda y ordenacion */}
      <SearchControls 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        filterStatus={filterStatus}      
        onFilterChange={setFilterStatus} 
      />
      {/* Feedback: Se muestra el contador si hay resultados */}
      {filteredLaunches.length > 0 && (
        <p className="results-counter">
          Se han encontrado <strong>{filteredLaunches.length}</strong> lanzamientos:
        </p>
      )}
      {/* map por cada mision que encuentra(launch) ejecuta el componente */}
      <div className="launch-list-grid">
        {filteredLaunches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>

      {/* Feedback si no hay resultados */}
      {filteredLaunches.length === 0 && (
        <div className="no-results-box">
          <h3>🔭 No se encontraron misiones</h3>
          <p>Prueba a cambiar los filtros de búsqueda.</p>
        </div>
      )}
    </section>
  );
};
