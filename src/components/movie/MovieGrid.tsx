import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../../services/omdbApi';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (id: string) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieClick }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <motion.div 
      className={styles.movieGrid}
      layout
    >
      <AnimatePresence>
        {movies.map((movie) => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            onClick={() => onMovieClick(movie.imdbID)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
