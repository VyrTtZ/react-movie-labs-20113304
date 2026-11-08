import { useParams } from "react-router";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";
import Credits from "../components/movieCreditsDetails";
import Spinner from "../components/spinner";
import { MoviesContext } from "../contexts/moviesContext";

const MovieCreditsPage = () => {
  const { id } = useParams();
  const { media } = useContext(MoviesContext);

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id, media }],
    queryFn: getMovie,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate movie={movie}>
      <Credits movie={movie} media={media} />
    </PageTemplate>
  );
};

export default MovieCreditsPage;
