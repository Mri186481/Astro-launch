import React, { useState, useEffect } from 'react';
import type { HeroImageData } from '../types'; // Importamos el tipo de imagen
import LoadingSpinner from './LoadingSpinner';
//APOD
//Acronimo de Astronomy Picture of the Day
//HERO(primer bloque visual o image principal)
//Seccion principal Impactante con fotos astronomicas

const ApodHero: React.FC = () => {
  const [heroImage, setHeroImage] = useState<HeroImageData | null>(null);

  useEffect(() => {
    const fetchSimpleImage = async () => {
      try {
        const response = await fetch('https://images-api.nasa.gov/search?q=rocket%20launch&media_type=image');
        const data = await response.json();
        const items = data.collection.items;
        
        if (items && items.length > 0) {
          const item = items[0];
          setHeroImage({
            url: item.links[0].href,
            title: item.data[0].title,
            description: item.data[0].description
          });
        }
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    };
    fetchSimpleImage();
  }, []);

  // 2. Si no hay imagen, muestro el Spinner
  if (!heroImage) {
    return (
      <div className="apod-hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section 
      className="apod-hero" 
      style={{ backgroundImage: `url(${heroImage.url})` }}
    >
      <div className="hero-overlay">
        <h1>{heroImage.title}</h1>
        {/*recorto la descripcion es enorme */}
        <p>{heroImage.description.substring(0, 150)}...</p>
      </div>
    </section>
  );
};

export default ApodHero;