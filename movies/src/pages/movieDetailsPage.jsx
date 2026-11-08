import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";


const MoviePage = (props) => {
  const { id } = useParams();
  const {media} = useContext(MoviesContext)
  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id, media}],
    queryFn: getMovie,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

return (
  <>
    <PageTemplate movie={movie}>
      <MovieDetails movie={movie} />
    </PageTemplate>
  </>
);
};

export default MoviePage;
