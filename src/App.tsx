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
import './App.css';

const MovieSkeleton = () => (
  <div className="skeleton-grid">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="skeleton-card">
        <Skeleton className="skeleton-poster" />
        <Skeleton className="skeleton-title" />
        <Skeleton className="skeleton-year" />
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
    <div className="app-wrapper">
      <header className="app-header-nav">
        <div className="container header-content">
          <div className="logo-section">
            <Film className="logo-icon" />
            <span className="logo-text">MovieExplorer</span>
          </div>
          <Button variant="ghost" onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </header>

      <main>
        <Hero onSearch={(query, type) => fetchMovies(query, 1, type)} loading={loading} />

        <div className="container main-content">
          {error && (
            <div className="status-container">
              <AlertCircle size={48} className="error-icon" />
              <p className="status-text">{error}</p>
              <p className="sub-status">Intenta buscar algo diferente o verifica tu conexión.</p>
            </div>
          )}

          {!loading && !error && movies.length === 0 && (
            <div className="status-container">
              <Film size={48} className="empty-icon" />
              <p className="status-text">Empieza tu búsqueda</p>
              <p className="sub-status">Encuentra información sobre millones de películas y series.</p>
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
