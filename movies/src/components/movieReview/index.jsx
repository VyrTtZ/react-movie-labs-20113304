import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import { MoviesContext } from "../../contexts/moviesContext";

const MovieReview =  ({ review }) => {
  const {media} = useContext(MoviesContext)
  
    const { data, error, isPending, isError } = useQuery({
    queryKey: ['reviews', { id: movie.id, media }],
    queryFn: getMovieReviews,
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const reviews = data.results;

  return (
    <>
      <Typography>
        Review By: {review.author}
      </Typography>

      <Typography>
        {review.content} 
      </Typography>
    </>
  );
};
export default MovieReview
