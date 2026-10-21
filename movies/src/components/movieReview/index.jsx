import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'

const MovieReview =  ({ review }) => {
    const { data, error, isPending, isError } = useQuery({
    queryKey: ['reviews', { id: movie.id }],
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
      <Typography variant="h5" component="h3">
        Review By: {review.author}
      </Typography>

      <Typography variant="h6" component="p">
        {review.content} 
      </Typography>
    </>
  );
};
export default MovieReview
