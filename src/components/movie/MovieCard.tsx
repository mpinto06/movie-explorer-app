import React from 'react';
import { Movie } from '../../services/omdbApi';
import { motion } from 'framer-motion';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const { Title, Year, Type, Poster } = movie;
  
  const posterUrl = Poster !== 'N/A' 
    ? Poster 
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <motion.div 
      className="movie-card" 
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="movie-poster-wrapper">
        <img src={posterUrl} alt={Title} className="movie-poster" loading="lazy" />
        <div className="movie-type-badge">{Type}</div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{Title}</h3>
        <span className="movie-year">{Year}</span>
      </div>
    </motion.div>
  );
};
