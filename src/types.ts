// Formato de anidacion
export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  links: Links;         
  details: string | null;
  rocket: string;
  launchpad: string | null;
}

export interface Links {
  patch: Patch;        
}

export interface Patch {
  small: string | null;
  large: string | null;
}

// --- Otros Tipos Independientes ---
export interface HeroImageData {
  url: string;
  title: string;
  description: string;
}