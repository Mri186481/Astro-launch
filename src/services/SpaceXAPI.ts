const BASE_URL = 'https://api.spacexdata.com/v4';

export const API_ENDPOINTS = {
  //API de imágenes de la NASA, paara ApodHero
  NASA_IMAGES: "https://images-api.nasa.gov/search?q=rocket%20launch&media_type=image",
  LAUNCHES: `${BASE_URL}/launches`,
  //Para saber el nombre real del cohete, tipo y descripcion buscamos un nuevo endPoint
  ROCKETS: "https://api.spacexdata.com/v4/rockets",
  //Para saber los datos de la plataforma de lanzamiento(localidad, region y coordenadas)
  LAUNCHPADS: "https://api.spacexdata.com/v4/launchpads",
  // URL base para el servicio de mapas externo, no require API key, y sirve para hechar un vsitazo de donde esta el lanzamiento
  MAP_SERVICE: "https://www.openstreetmap.org/export/embed.html",
  // Servicio de navegación de Google (Para el botón externo)
  GOOGLE_MAPS_BASE: "https://www.google.com/maps/search/?api=1&query="

  
};