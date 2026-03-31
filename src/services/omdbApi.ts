const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface SearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export type MovieType = 'movie' | 'series' | 'episode' | '';

export const searchMovies = async (
  title: string, 
  page: number = 1, 
  type: MovieType = '',
  year: string = ''
): Promise<SearchResponse> => {
  if (!title) return { Search: [], totalResults: "0", Response: "False" };
  
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&s=${title}&page=${page}`;
    if (type) {
      url += `&type=${type}`;
    }
    if (year) {
      url += `&y=${year}`;
    }
    
    const response = await fetch(url);
    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error al buscar películas:', error);
    return { Response: "False", Error: "Error de red al conectar con OMDb" };
  }
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetails | { Response: string; Error: string }> => {
  if (!imdbID) return { Response: "False", Error: "ID de película no proporcionado" };
  
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data: MovieDetails = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener detalles de la película:', error);
    return { Response: "False", Error: "Error de red al conectar con OMDb" };
  }
};
