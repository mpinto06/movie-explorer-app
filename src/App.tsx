import React, { useState, useEffect } from 'react';
import { Hero } from './components/layout/Hero';
import { MovieGrid } from './components/movie/MovieGrid';
import { MovieDetail } from './components/movie/MovieDetail';
import { Pagination } from './components/movie/Pagination';
import { Footer } from './components/layout/Footer';
import { useMovies } from './hooks/useMovies';
import { Moon, Sun, AlertCircle, Film } from 'lucide-react';
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
    changePage 
  } = useMovies();

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

  return (
    <div className={styles.appWrapper}>
      <header className={styles.appHeaderNav}>
        <div className={`container ${styles.headerContent}`}>
          <div className={styles.logoSection}>
            <Film className={styles.logoIcon} />
            <span className="logo-text">MovieExplorer</span>
          </div>
          <Button variant="ghost" onClick={toggleTheme} className={styles.themeToggle}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </header>

      <main>
        <Hero onSearch={(query, type) => fetchMovies(query, 1, type)} loading={loading} />

        <div className={`container ${styles.mainContent}`}>
          {error && (
            <div className={styles.statusContainer}>
              <AlertCircle size={48} className={styles.errorIcon} />
              <p className={styles.statusText}>{error}</p>
              <p className={styles.subStatus}>Intenta buscar algo diferente o verifica tu conexión.</p>
            </div>
          )}

          {!loading && !error && movies.length === 0 && (
            <div className={styles.statusContainer}>
              <Film size={48} className={styles.emptyIcon} />
              <p className={styles.statusText}>Empieza tu búsqueda</p>
              <p className={styles.subStatus}>Encuentra información sobre millones de películas y series.</p>
            </div>
          )}

          {loading ? (
            <MovieSkeleton />
          ) : (
            <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
          )}

          {!loading && !error && movies.length > 0 && (
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
