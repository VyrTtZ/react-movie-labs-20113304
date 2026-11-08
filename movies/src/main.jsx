import { createRoot } from "react-dom/client";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import HomePage from "./pages/homePage";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UpcomingPage from "./pages/upcomingMoviesPage";
import MoviesContextProvider from "./contexts/moviesContext";
import NowPlaying from "./pages/nowPlaying";
import TopRated from "./pages/topRated";
import Hated from "./pages/hated";
import MovieRecommendationsPage from "./pages/movieRecommendations";
import MovieCreditsPage from "./pages/movieCredits";
import { theme } from "./styles/theme.jsx";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseLine from "@mui/material/CssBaseline";


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
  <ThemeProvider theme={theme}>
<CssBaseLine />    
<QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
          
        <SiteHeader />
	        <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
	  <Route path="/movie/:id/credits" element={<MovieCreditsPage />} />
            <Route path="/movie/:id/recommendations" element={<MovieRecommendationsPage />} />
            <Route path="/tv/:id" element={<MoviePage />} />
            <Route path="/tv/:id/recommendations" element={<MovieRecommendationsPage />} />
            <Route path="/" element={<HomePage />} />
	          <Route path="/movies/now_playing" element={<NowPlaying />}/>
	          <Route path="/movies/top_rated" element={<TopRated />}/>
	          <Route path="/movies/hated" element={<Hated />}/>
            <Route path="*" element={<Navigate to="/" />} />
	        </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
   </ ThemeProvider>
  );
};




const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
