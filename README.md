# MovieExplorer App - Prueba Técnica Nextep Innovation

Esta es una aplicación web desarrollada con React y TypeScript que permite a los usuarios buscar películas y series utilizando la API de OMDb (Open Movie Database). Los usuarios pueden ver detalles de cada título, gestionar una lista de favoritos y disfrutar de una interfaz responsive con soporte para modo oscuro.

### Requisitos previos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- npm o yarn

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/mpinto06/movie-explorer-app.git
    cd movie-explorer-app
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

### Configuración de la API Key

Para que la aplicación funcione, necesitas una API Key de OMDb.

1.  **Obtener la Key:**
    - Ve a [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx).
    - Selecciona el plan **"FREE"** (1,000 peticiones diarias).
    - Ingresa tu correo electrónico y activa la key mediante el enlace que recibirás.

2.  **Configurar variables de entorno:**
    - Crea un archivo llamado `.env` en la raíz del proyecto (puedes usar `.env.example` como base).
    - Agrega tu key de la siguiente manera:
      ```env
      VITE_OMDB_API_KEY=tu_api_key_aqui
      ```

### Ejecución

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173` (o el puerto indicado por Vite).

---

## Arquitectura del Proyecto

El proyecto sigue una estructura modular y escalable, separando las responsabilidades de lógica, estado y presentación.

### Estructura de carpetas

-   `src/services/`: Contiene la lógica de comunicación con la API externa (`omdbApi.ts`).
-   `src/context/`: Gestión del estado global de la aplicación, como la lista de favoritos (`FavoritesContext.tsx`).
-   `src/hooks/`: Hooks personalizados para encapsular lógica de negocio reutilizable (`useMovies.ts`).
-   `src/components/`: Componentes de la interfaz organizados por categorías:
    -   `common/`: Componentes base reutilizables (Button, Input, Skeleton).
    -   `layout/`: Estructura general (Hero, Footer).
    -   `movie/`: Componentes específicos del dominio de películas (MovieCard, MovieGrid, MovieDetail).
-   `src/assets/`: Recursos estáticos como imágenes e iconos.

### Decisiones Técnicas

-   **React + Vite + TypeScript:** Para un desarrollo rápido, tipado seguro y optimización en producción.
-   **CSS Modules:** Se utiliza para el estilizado, garantizando que los estilos estén encapsulados por componente, evitando colisiones globales y mejorando la mantenibilidad.
-   **Framer Motion:** Para animaciones fluidas y micro-interacciones que mejoran la experiencia de usuario.
-   **Context API:** Para manejar el estado de favoritos de forma global.
-   **LocalStorage:** Para persistir tanto la lista de favoritos del usuario como la preferencia de tema (claro/oscuro) entre sesiones.

---

## Funcionalidades implementadas

- Buscador de películas con validación (mínimo contenido, máximo 50 caracteres).
- Visualización de resultados en grid responsive.
- Paginación de resultados.
- Detalle de película en modal con información extendida.
- Gestión de Favoritos (añadir, ver y eliminar).
- Modo Oscuro / Claro.
- Skeleton Loading para estados de carga.
- Manejo de errores amigable y estados vacíos.
- Validaciones de posters inexistentes.

---

Desarrollado para la prueba técnica de **Nextep Innovation**.
Link de la aplicación: https://movie-test-nextstep.netlify.app/
