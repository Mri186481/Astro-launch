const BASE_URL = 'https://api.spacexdata.com/v4';

export const API_ENDPOINTS = {
  LAUNCHES: `${BASE_URL}/launches`,
  //Para saber el nombre real del cohete, tipo y descripcion buscamos un nuevo endPoint
  ROCKETS: "https://api.spacexdata.com/v4/rockets",
  //Para saber los datos de la plataforma de lanzamiento(localidad, region y coordenadas)
  LAUNCHPADS: "https://api.spacexdata.com/v4/launchpads",

  

  // Se pueden añadir mas endpoints en el futuro
  // mas facil de mantener, separo la configuracion de la interfaz
};