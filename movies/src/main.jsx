import { createRoot } from "react-dom/client";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import HatedMoviesPage from "./pages/hatedMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import HomePage from "./pages/homePage";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <Routes>
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/upcoming" element={<UpcomingPage />} />
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
