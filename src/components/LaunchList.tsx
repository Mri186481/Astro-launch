import { useEffect, useState } from "react";
import type { Launch } from "../types";
import { API_ENDPOINTS } from "../services/SpaceXAPI";
import LaunchCard from "./LaunchCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";


export default function LaunchList() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  


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

  
  return (
      <div className="launch-list-grid">
        {launches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
  );
};
