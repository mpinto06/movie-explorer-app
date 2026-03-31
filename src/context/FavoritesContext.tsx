import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '../services/omdbApi';

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('movie-explorer-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('movie-explorer-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.imdbID === movie.imdbID)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavorite = (imdbID: string) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  const isFavorite = (imdbID: string) => {
    return favorites.some((m) => m.imdbID === imdbID);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
