import React, { useState, useEffect } from 'react';
import { Hero } from './components/layout/Hero';
import { MovieGrid } from './components/movie/MovieGrid';
import { MovieDetail } from './components/movie/MovieDetail';
import { Pagination } from './components/movie/Pagination';
import { Footer } from './components/layout/Footer';
import { useMovies } from './hooks/useMovies';
import { useFavorites } from './context/FavoritesContext';
import { Moon, Sun, AlertCircle, Film, Heart } from 'lucide-react';
import { Button } from './components/common/Button';
import { Skeleton } from './components/common/Skeleton';
import styles from './App.module.css';

const MovieSkeleton = () => (
  <div className={styles.skeletonGrid}>
    {[...Array(8)].map((_, i) => (
      <div key={i} className={styles.skeletonCard}>
        <Skeleton className={styles.skeletonPoster} />
        <Skeleton className={styles.skeletonTitle} />
        <Skeleton className={styles.skeletonYear} />
      </div>
    ))}
  </div>
);

const App: React.FC = () => {
  const { 
    movies, 
    loading, 
    error, 
    totalResults, 
    currentPage, 
    fetchMovies, 
    changePage,
    lastQuery
  } = useMovies();

  const { favorites } = useFavorites();
  const [viewMode, setViewMode] = useState<'search' | 'favorites'>('search');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleMovieClick = (id: string) => {
    setSelectedMovieId(id);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  const handleSearch = (query: string, type: any) => {
    setViewMode('search');
    fetchMovies(query, 1, type);
  };

  const handleShowFavorites = () => {
    setViewMode('favorites');
  };

  return (
    <div className={styles.appWrapper}>
      <header className={styles.appHeaderNav}>
        <div className={`container ${styles.headerContent}`}>
          <div className={styles.logoSection} onClick={() => setViewMode('search')}>
            <Film className={styles.logoIcon} />
            <span className={styles.logoText}>MovieExplorer</span>
          </div>
          <Button variant="ghost" onClick={toggleTheme} className={styles.themeToggle}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </header>

      <main>
        <Hero 
          onSearch={handleSearch} 
          onShowFavorites={handleShowFavorites}
          loading={loading} 
        />

        <div className={`container ${styles.mainContent}`}>
          {viewMode === 'favorites' && (
            <div className={styles.favoritesHeader}>
              <Heart fill="currentColor" className="text-rose-500" size={24} />
              <h2 className={styles.favoritesTitle}>Mis Favoritos</h2>
            </div>
          )}

          {viewMode === 'search' && error && (
            <div className={styles.statusContainer}>
              <AlertCircle size={48} className={styles.errorIcon} />
              <p className={styles.statusText}>{error}</p>
              <p className={styles.subStatus}>Intenta buscar algo diferente o verifica tu conexión.</p>
            </div>
          )}

          {viewMode === 'search' && !loading && !error && movies.length === 0 && (
            <div className={styles.statusContainer}>
              <Film size={48} className={styles.emptyIcon} />
              <p className={styles.statusText}>Empieza tu búsqueda</p>
              <p className={styles.subStatus}>Encuentra información sobre millones de películas y series.</p>
            </div>
          )}

          {viewMode === 'favorites' && favorites.length === 0 && (
            <div className={styles.statusContainer}>
              <Heart size={48} className={styles.emptyIcon} />
              <p className={styles.statusText}>No tienes favoritos aún</p>
              <p className={styles.subStatus}>Añade películas o series a tus favoritos para verlas aquí.</p>
              <Button variant="outline" onClick={() => setViewMode('search')} className="mt-4">
                Volver al buscador
              </Button>
            </div>
          )}

          {loading ? (
            <MovieSkeleton />
          ) : (
            <MovieGrid 
              movies={viewMode === 'search' ? movies : favorites} 
              onMovieClick={handleMovieClick} 
            />
          )}

          {viewMode === 'search' && !loading && !error && movies.length > 0 && (
            <Pagination 
              currentPage={currentPage} 
              totalResults={totalResults} 
              onPageChange={changePage} 
            />
          )}
        </div>
      </main>

      <Footer />

      {selectedMovieId && (
        <MovieDetail 
          imdbID={selectedMovieId} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;
