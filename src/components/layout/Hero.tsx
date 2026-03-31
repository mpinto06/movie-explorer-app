import React, { useState } from 'react';
import { Search, Heart, Calendar } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { MovieType } from '../../services/omdbApi';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './Hero.module.css';

interface HeroProps {
  onSearch: (query: string, type: MovieType, year: string) => void;
  onShowFavorites: () => void;
  loading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onShowFavorites, loading }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<MovieType>('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const { favorites } = useFavorites();

  const handleTypeChange = (newType: MovieType) => {
    setType(newType);
    if (query.trim() && query.length <= 50) {
      onSearch(query, newType, year);
    }
  };

  const handleYearChange = (newYear: string) => {
    // Basic validation for year (up to 4 digits)
    if (newYear && !/^\d{0,4}$/.test(newYear)) return;
    setYear(newYear);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('El campo de búsqueda es obligatorio');
      return;
    }
    if (query.length > 50) {
      setError('Máximo 50 caracteres');
      return;
    }
    setError('');
    onSearch(query, type, year);
  };

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.heroTitle}>Explora el mundo del cine</h1>
        <p className={styles.heroSubtitle}>Busca tus películas, series y episodios favoritos en un solo lugar.</p>
        
        <form onSubmit={handleSubmit} className={styles.searchContainerGroup}>
          <div className={styles.searchInputsFlex}>
            <div className={styles.searchInputWrapper}>
              <Input
                type="text"
                placeholder="Ej. Batman, Star Wars..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (error) setError('');
                }}
                error={error}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.searchFiltersGroup}>
              <div className={styles.searchFilterWrapper}>
                <select 
                  value={type} 
                  onChange={(e) => handleTypeChange(e.target.value as MovieType)}
                  className={styles.searchTypeSelect}
                >
                  <option value="">Todos</option>
                  <option value="movie">Películas</option>
                  <option value="series">Series</option>
                  <option value="episode">Episodios</option>
                </select>
              </div>

              <div className={styles.searchYearWrapper}>
                <input
                  type="text"
                  placeholder="Año"
                  value={year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className={styles.searchYearInput}
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          <div className={styles.searchActions}>
            <Button type="submit" disabled={loading} className={styles.searchButton}>
              {loading ? 'Buscando...' : (
                <>
                  <Search size={18} />
                  <span>Buscar</span>
                </>
              )}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={onShowFavorites} 
              className={styles.favoriteButton}
            >
              <Heart size={18} fill={favorites.length > 0 ? "currentColor" : "none"} />
              <span>Favoritos ({favorites.length})</span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
