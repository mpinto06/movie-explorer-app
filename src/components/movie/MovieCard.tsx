import React from 'react';
import { Movie } from '../../services/omdbApi';
import { motion } from 'framer-motion';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const { Title, Year, Type, Poster } = movie;

  return (
    <motion.div 
      className={styles.movieCard} 
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.moviePosterWrapper}>
        {Poster !== 'N/A' ? (
          <img src={Poster} alt={Title} className={styles.moviePoster} loading="lazy" />
        ) : (
          <div className={styles.noPoster}>Sin imagen disponible</div>
        )}
        <div className={styles.movieTypeBadge}>{Type}</div>
      </div>
      <div className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>{Title}</h3>
        <span className={styles.movieYear}>{Year}</span>
      </div>
    </motion.div>
  );
};
