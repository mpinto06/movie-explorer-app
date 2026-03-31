import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { MovieType } from '../../services/omdbApi';
import styles from './Hero.module.css';

interface HeroProps {
  onSearch: (query: string, type: MovieType) => void;
  loading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<MovieType>('');
  const [error, setError] = useState('');

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
    onSearch(query, type);
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
            
            <div className={styles.searchFilterWrapper}>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value as MovieType)}
                className={styles.searchTypeSelect}
              >
                <option value="">Todos</option>
                <option value="movie">Películas</option>
                <option value="series">Series</option>
                <option value="episode">Episodios</option>
              </select>
            </div>
          </div>

          <Button type="submit" disabled={loading} className={styles.searchButton}>
            {loading ? 'Buscando...' : (
              <>
                <Search size={18} />
                <span>Buscar</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};
