import React, { useEffect, useState } from 'react';
import { X, Star, Calendar, Clock, Film, User, Award, ExternalLink } from 'lucide-react';
import { getMovieDetails, MovieDetails } from '../../services/omdbApi';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';

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
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="modal-content" 
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <Button variant="ghost" size="icon" className="modal-close" onClick={onClose}>
            <X size={24} />
          </Button>

          {loading ? (
            <div className="modal-status">
              <div className="spinner"></div>
              <p>Cargando detalles...</p>
            </div>
          ) : error ? (
            <div className="modal-status">
              <p className="text-rose-500 font-medium">{error}</p>
              <Button onClick={onClose} variant="outline" className="mt-4">Cerrar</Button>
            </div>
          ) : movie && (
            <div className="movie-detail-container">
              <div className="movie-detail-poster-section">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Poster'} 
                  alt={movie.Title} 
                  className="movie-detail-poster"
                />
                <div className="movie-detail-ratings">
                  <div className="rating-item">
                    <Star className="text-amber-400 fill-amber-400" size={20} />
                    <span className="rating-value">{movie.imdbRating}</span>
                    <span className="rating-max">/10</span>
                  </div>
                  <div className="rating-votes">{movie.imdbVotes} votos</div>
                </div>
              </div>

              <div className="movie-detail-info-section">
                <div className="movie-detail-header">
                  <h2 className="movie-detail-title">{movie.Title}</h2>
                  <div className="movie-detail-meta">
                    <span className="meta-badge">{movie.Type}</span>
                    <span className="meta-badge">{movie.Rated}</span>
                    <span className="meta-badge">{movie.Runtime}</span>
                  </div>
                </div>

                <div className="movie-detail-grid">
                  <div className="detail-item">
                    <Calendar className="detail-icon" size={18} />
                    <div>
                      <span className="detail-label">Lanzamiento</span>
                      <p className="detail-value">{movie.Released}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Film className="detail-icon" size={18} />
                    <div>
                      <span className="detail-label">Género</span>
                      <p className="detail-value">{movie.Genre}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <User className="detail-icon" size={18} />
                    <div>
                      <span className="detail-label">Director</span>
                      <p className="detail-value">{movie.Director}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Award className="detail-icon" size={18} />
                    <div>
                      <span className="detail-label">Premios</span>
                      <p className="detail-value line-clamp-2">{movie.Awards}</p>
                    </div>
                  </div>
                </div>

                <div className="movie-detail-section">
                  <h3 className="section-title">Sinopsis</h3>
                  <p className="section-content">{movie.Plot}</p>
                </div>

                <div className="movie-detail-section">
                  <h3 className="section-title">Reparto</h3>
                  <p className="section-content">{movie.Actors}</p>
                </div>

                <div className="movie-detail-actions">
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
