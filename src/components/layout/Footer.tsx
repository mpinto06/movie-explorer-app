import React from 'react';
import { Film, Globe, Share2, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo-section">
            <Film className="logo-icon" />
            <span className="logo-text">MovieExplorer</span>
          </div>
          <p className="footer-description">
            Tu portal cinematográfico para descubrir información detallada sobre tus películas y series favoritas.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" title="GitHub"><Globe size={20} /></a>
            <a href="#" className="social-link" title="Twitter"><Share2 size={20} /></a>
            <a href="#" className="social-link" title="LinkedIn"><Users size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Plataforma</h4>
          <ul>
            <li><a href="#">Buscador</a></li>
            <li><a href="#">Populares</a></li>
            <li><a href="#">Próximamente</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4 className="footer-title">Compañía</h4>
          <ul>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Términos</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MovieExplorer. Desarrollado para Nextep Innovation.</p>
        </div>
      </div>
    </footer>
  );
};
