import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Spinner from "../spinner";
import { getCredits } from "../../api/tmdb-api";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

const Credits = ({ movie, media }) => {
console.log(media);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id, media }],
    queryFn: getCredits,
  });

console.log(data);

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <Typography >
        Credits
      </Typography>
      <Paper component="ul">
        {data.cast.map((m) => (
          <li key={m.id}>
            <Chip
              label={m.name}
              component={Link}
              to={`/actor/${m.id}`}
              clickable
            />
          </li>
        ))}
      </Paper>
    </>
  );
};

export default Credits;
