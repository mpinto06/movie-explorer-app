import React, { useEffect, useState } from 'react';
import { X, Star, Calendar, Clock, Film, User, Award, ExternalLink } from 'lucide-react';
import { getMovieDetails, MovieDetails } from '../../services/omdbApi';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MovieDetail.module.css';

interface MovieDetailProps {
  imdbID: string;
  onClose: () => void;
}

export const MovieDetail: React.FC<MovieDetailProps> = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
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
              <p className="text-rose-500 font-medium">{error}</p>
              <Button onClick={onClose} variant="outline" className="mt-4">Cerrar</Button>
            </div>
          ) : movie && (
            <div className={styles.movieDetailContainer}>
              <div className={styles.movieDetailPosterSection}>
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Poster'} 
                  alt={movie.Title} 
                  className={styles.movieDetailPoster}
                />
                <div className={styles.movieDetailRatings}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star className="text-amber-400 fill-amber-400" size={20} />
                    <span className={styles.ratingValue}>{movie.imdbRating}</span>
                    <span className={styles.ratingMax}>/10</span>
                  </div>
                  <div className={styles.ratingVotes}>{movie.imdbVotes} votos</div>
                </div>
              </div>

              <div className={styles.movieDetailInfoSection}>
                <div className={styles.movieDetailHeader}>
                  <h2 className={styles.movieDetailTitle}>{movie.Title}</h2>
                  <div className={styles.movieDetailMeta}>
                    <span className={styles.metaBadge}>{movie.Type}</span>
                    <span className={styles.metaBadge}>{movie.Rated}</span>
                    <span className={styles.metaBadge}>{movie.Runtime}</span>
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

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 'auto' }}>
                  <Button className="w-full sm:w-auto" onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, '_blank')}>
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
