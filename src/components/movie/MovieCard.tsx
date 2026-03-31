import React from 'react';
import { Movie } from '../../services/omdbApi';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const { Title, Year, Type, Poster, imdbID } = movie;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [imageError, setImageError] = React.useState(false);
  
  const favorite = isFavorite(imdbID);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(imdbID);
    } else {
      addFavorite(movie);
    }
  };

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
        <button 
          className={`${styles.favoriteButton} ${favorite ? styles.isFavorite : ''}`}
          onClick={toggleFavorite}
          aria-label={favorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
        >
          <Heart size={20} fill={favorite ? "currentColor" : "none"} />
        </button>
        
        {Poster !== 'N/A' && !imageError ? (
          <img 
            src={Poster} 
            alt={Title} 
            className={styles.moviePoster} 
            loading="lazy"
            onError={() => setImageError(true)}
          />
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
