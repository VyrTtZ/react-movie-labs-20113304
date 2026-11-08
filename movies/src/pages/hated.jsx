
import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";


const HatedMoviesPage = () => {
  const {hated: movieIds } = useContext(MoviesContext);
  const {media} = useContext(MoviesContext)

  const hatedMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId, media }],
        queryFn: getMovie,
      }
    })
  });
  

  const isPending = hatedMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = hatedMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

return (
  <PageTemplate
    title="Hated Movies"
    movies={movies}
    action={(movie) => {
      return (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      );
    }}
  />
);
};
export default HatedMoviesPage;
