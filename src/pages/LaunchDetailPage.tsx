import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Launch } from '../types';
import { API_ENDPOINTS } from '../services/SpaceXAPI'; 
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function LaunchDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    
    fetch(`${API_ENDPOINTS.LAUNCHES}/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("No se encontró el lanzamiento");
        return response.json();
      })
      .then((data: Launch) => {
        setLaunch(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error al obtener los detalles");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!launch) return null;

  return (
    <main className="page-container detail-page">
      
      <Link to="/" className="back-link">← Volver al listado</Link>
      
      <div className="detail-grid">
       
        <div className="detail-image-container">
          <img 
            src={launch.links.patch.large || ''} 
            alt={launch.name} 
          />
        </div>

        
        <div className="detail-info">
          <h1>{launch.name}</h1>
          <div className="info-box">
            <h3>Descripción de la misión</h3>
            <p>{launch.details || 'Sin descripción disponible para esta misión.'}</p>
          </div>
          
          <div className="info-meta">
            <p><strong>Fecha de lanzamiento:</strong> {new Date(launch.date_utc).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </main>
  );
}