import { createRoot } from "react-dom/client";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import HatedMoviesPage from "./pages/hatedMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import HomePage from "./pages/homePage";

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
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/movies/hated" element={<HatedMoviesPage />} />
      </Routes>
    </BrowserRouter>

  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
