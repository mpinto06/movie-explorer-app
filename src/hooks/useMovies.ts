import { useState, useCallback } from 'react';
import { searchMovies, Movie, MovieType } from '../services/omdbApi';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastQuery, setLastQuery] = useState<string>('');
  const [type, setType] = useState<MovieType>('');

  const fetchMovies = useCallback(async (query: string, page: number = 1, movieType: MovieType = type) => {
    if (!query || query.trim().length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchMovies(query, page, movieType);
      
      if (data.Response === 'True') {
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults || "0", 10));
        setCurrentPage(page);
        setLastQuery(query);
        setType(movieType);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || 'No se encontraron resultados');
      }
    } catch {
      setError('Error al conectar con la API');
    } finally {
      setLoading(false);
    }
  }, [type]);

  const changePage = (newPage: number) => {
    fetchMovies(lastQuery, newPage, type);
  };

  const changeType = (newType: MovieType) => {
    fetchMovies(lastQuery, 1, newType);
  };

  return { 
    movies, 
    loading, 
    error, 
    totalResults, 
    currentPage, 
    type,
    fetchMovies, 
    changePage,
    changeType,
    lastQuery
  };
};
