import React from 'react';
import { Film, Globe, Share2, Users } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.appFooter}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <div className={styles.logoSection}>
            <Film className={styles.logoIcon} />
            <span className={styles.logoText}>MovieExplorer</span>
          </div>
          <p className={styles.footerDescription}>
            Tu portal cinematográfico para descubrir información detallada sobre tus películas y series favoritas.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} title="GitHub"><Globe size={20} /></a>
            <a href="#" className={styles.socialLink} title="Twitter"><Share2 size={20} /></a>
            <a href="#" className={styles.socialLink} title="LinkedIn"><Users size={20} /></a>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <h4 className={styles.footerTitle}>Plataforma</h4>
          <ul>
            <li><a href="#">Buscador</a></li>
            <li><a href="#">Populares</a></li>
            <li><a href="#">Próximamente</a></li>
          </ul>
        </div>

        <div className={styles.footerLinks}>
          <h4 className={styles.footerTitle}>Compañía</h4>
          <ul>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Términos</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MovieExplorer. Desarrollado para Nextep Innovation.</p>
        </div>
      </div>
    </footer>
  );
};
