import { useState, useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const UpcomingMoviesPage = () => {
  const [page, setPage] = useState(1);
  const { media } = useContext(MoviesContext);
  //console.log({media})
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming", { page, media  }],
    queryFn: getUpcomingMovies,
  });
  //console.log({data})

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results

return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
      page={page}
      totalPages={Math.min(data.total_pages, 500)}
      onPageChange={setPage}
    />
  );
};

export default UpcomingMoviesPage;





