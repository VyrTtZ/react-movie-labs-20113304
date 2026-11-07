
import { getMoviesList } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useState, useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";


const NowPlaying = () => {
const [page, setPage] = useState(1);
  const {media} = useContext(MoviesContext)

  const { data, error, isPending, isError  } = useQuery({
	queryKey: ['now playing list', { type: "now_playing", page, media}],
    queryFn: getMoviesList,
  })
  
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
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
        page={page}

      totalPages={Math.min(data.total_pages, 500)}
      onPageChange={setPage}
      />
  );

};
export default NowPlaying;
