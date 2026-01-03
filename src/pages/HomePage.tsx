import React from 'react';
import ApodHero from '../components/layout/LaunchHero';
import LaunchList from '../components/LaunchList';

const HomePage: React.FC = () => {
  return (
    <main className="page-container">
      {/* 1. Impacto visual inmediato */}
      <ApodHero />
      
      {/* 2. Contenido principal */}
      <section className="launches-section">
        <h2>Próximos Lanzamientos</h2>
        <LaunchList />
      </section>
    </main>
  );
};

export default HomePage;