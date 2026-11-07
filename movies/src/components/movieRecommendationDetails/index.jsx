import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Spinner from "../spinner";
import { getRecommendations } from "../../api/tmdb-api";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

const Recommendations = ({ movie, media }) => {
  
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id: movie.id, media }],
    queryFn: getRecommendations,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <Typography variant="h5" component="h3">
        Recommendations
      </Typography>
      <Paper component="ul">
        {data.results.map((m) => (
          <li key={m.id}>
            <Chip
              label={m.title ?? m.name}
              component={Link}
              to={`/${media}/${m.id}/recommendations`}
              clickable
            />
          </li>
        ))}
      </Paper>
    </>
  );
};

export default Recommendations;