import heroImage from '../../assets/hero-launch.jpg'; 

export default function LaunchHero() {
  return (
    <section 
      className="apod-hero" 
      style={{ 
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className="hero-overlay">
        <h1>Explorando el Horizonte 🚀</h1>
        <p>
          Sigue en tiempo real todas las misiones y lanzamientos del programa SpaceX. 
          Datos actualizados y detallados de cada despegue.
        </p>
      </div>
    </section>
  );
}