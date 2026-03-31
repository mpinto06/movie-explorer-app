import React, { useEffect, useState } from 'react';
import { X, Star, Calendar, Film, User, Award, ExternalLink, Heart } from 'lucide-react';
import { getMovieDetails, MovieDetails, Movie } from '../../services/omdbApi';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './MovieDetail.module.css';

interface MovieDetailProps {
  imdbID: string;
  onClose: () => void;
}

export const MovieDetail: React.FC<MovieDetailProps> = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const favorite = isFavorite(imdbID);

  const toggleFavorite = () => {
    if (!movie) return;
    if (favorite) {
      removeFavorite(imdbID);
    } else {
      const movieToSave: Movie = {
        Title: movie.Title,
        Year: movie.Year,
        imdbID: movie.imdbID,
        Type: movie.Type,
        Poster: movie.Poster
      };
      addFavorite(movieToSave);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      setImageError(false);
      try {
        const data = await getMovieDetails(imdbID);
        if ('Response' in data && data.Response === 'True') {
          setMovie(data as MovieDetails);
        } else if ('Error' in data) {
          setError(data.Error);
        }
      } catch {
        setError('Error al cargar los detalles');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay} onClick={onClose}>
        <motion.div 
          className={styles.modalContent} 
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <Button variant="ghost" size="icon" className={styles.modalClose} onClick={onClose}>
            <X size={24} />
          </Button>

          {loading ? (
            <div className={styles.modalStatus}>
              <div className="spinner"></div>
              <p>Cargando detalles...</p>
            </div>
          ) : error ? (
            <div className={styles.modalStatus}>
              <p className={styles.errorText}>{error}</p>
              <Button onClick={onClose} variant="outline" className="mt-4">Cerrar</Button>
            </div>
          ) : movie && (
            <div className={styles.movieDetailContainer}>
              <div className={styles.movieDetailPosterSection}>
                {movie.Poster !== 'N/A' && !imageError ? (
                  <img 
                    src={movie.Poster} 
                    alt={movie.Title} 
                    className={styles.movieDetailPoster}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className={styles.noPosterDetail}>Sin imagen disponible</div>
                )}
              </div>

              <div className={styles.movieDetailInfoSection}>
                <div className={styles.movieDetailHeader}>
                  <div className={styles.titleWrapper}>
                    <h2 className={styles.movieDetailTitle}>{movie.Title}</h2>
                    <button 
                      className={`${styles.favoriteButton} ${favorite ? styles.isFavorite : ''}`}
                      onClick={toggleFavorite}
                      aria-label={favorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
                    >
                      <Heart size={24} fill={favorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className={styles.movieDetailMeta}>
                    <span className={styles.metaBadge}>{movie.Type}</span>
                    <span className={styles.metaBadge}>{movie.Rated}</span>
                    <span className={styles.metaBadge}>{movie.Runtime}</span>
                  </div>
                  
                  <div className={styles.movieDetailRatings}>
                    <div className={styles.ratingHeader}>
                      <Star className={styles.starIcon} size={20} />
                      <span className={styles.ratingValue}>{movie.imdbRating}</span>
                      <span className={styles.ratingMax}>/10</span>
                    </div>
                    <div className={styles.ratingVotes}>{movie.imdbVotes} votos</div>
                  </div>
                </div>

                <div className={styles.movieDetailGrid}>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>
                      <Calendar size={18} />
                      <span>Lanzamiento</span>
                    </div>
                    <p className={styles.detailValue}>{movie.Released}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>
                      <Film size={18} />
                      <span>Género</span>
                    </div>
                    <p className={styles.detailValue}>{movie.Genre}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>
                      <User size={18} />
                      <span>Director</span>
                    </div>
                    <p className={styles.detailValue}>{movie.Director}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>
                      <Award size={18} />
                      <span>Premios</span>
                    </div>
                    <p className={styles.detailValue}>{movie.Awards}</p>
                  </div>
                </div>

                <div className={styles.movieDetailSection}>
                  <h3>Sinopsis</h3>
                  <p className={styles.sectionContent}>{movie.Plot}</p>
                </div>

                <div className={styles.movieDetailSection}>
                  <h3>Reparto</h3>
                  <p className={styles.sectionContent}>{movie.Actors}</p>
                </div>

                <div className={styles.movieDetailActions}>
                  <Button className={styles.imdbButton} onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, '_blank')}>
                    <ExternalLink size={18} className="mr-2" />
                    Ver en IMDb
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
