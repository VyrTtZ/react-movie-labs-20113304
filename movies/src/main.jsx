import { createRoot } from "react-dom/client";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import HatedMoviesPage from "./pages/hatedMoviesPage";

const App = () => {
  return (
       <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={ <Navigate to="/" /> } />
        <Route path="/movies/hated" element={<HatedMoviesPage />} />
      </Routes>
    </BrowserRouter>

  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
