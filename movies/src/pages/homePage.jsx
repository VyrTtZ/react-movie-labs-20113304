import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useState, useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";

// Home page: paginated list of discovered movies or TV shows
const HomePage = () => {
  const [page, setPage] = useState(1); // current results page
  const { media } = useContext(MoviesContext); // "movie" or "tv"

  // Fetch the current page; refetches when media or page changes
  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover', {media, page }],
    queryFn: getMovies,
  })
  
  // Show a spinner while loading, or the error message if the request failed
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

return (
  <PageTemplate
    title="Discover Movies"
    movies={movies}
    // Icon shown on each movie card
    action={(movie) => {
      return <AddToFavoritesIcon movie={movie} />
    }}
    page={page}
    // TMDB only serves up to 500 pages
    totalPages={Math.min(data.total_pages, 500)}
    onPageChange={setPage}
  />
);
};
export default HomePage;