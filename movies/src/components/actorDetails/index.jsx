import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import StarRate from "@mui/icons-material/StarRate";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import { getActorsMovies } from "../../api/tmdb-api";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

const ActorDetails = ({ actor }) => {
console.log("actor prop:", actor);
  const { media } = useContext(MoviesContext)
  const{ data, error, isPending, isError} = useQuery({
    queryKey: ["filmography", { id: actor.id }],
    queryFn: getActorsMovies,
  });

    if (isPending) return <Spinner />;
    if (isError) return <h1>{error.message}</h1>;
  return (
    <>
    <Paper>
      <Typography>
        Biography
      </Typography>

      <Typography>
        {actor.biography || "No biography available."}
      </Typography>

      <Paper component="ul">
        <li>
          <Chip icon={<CakeIcon />} label={`Born: ${actor.birthday ?? "Unknown"}`} />
        </li>
        {actor.deathday && (
          <li>
            <Chip label={`Died: ${actor.deathday}`} />
          </li>
        )}
        <li>
          <Chip icon={<PlaceIcon />} label={actor.place_of_birth ?? "Unknown"} />
        </li>
        <li>
          <Chip label={`Known for: ${actor.known_for_department}`} />
        </li>
        <li>
          <Chip icon={<StarRate />} label={`Popularity: ${actor.popularity}`} />
        </li>
      </Paper>

      <Paper component="ul">
        {data.cast.map((m) => (
          <li key={m.id}>
            <Chip
              label={m.title ?? m.name}
              component={Link}
              to={`/${media}/${m.id}`}
              clickable
            />
          </li>
        ))}
      </Paper>
</Paper>
    </>
  );
};

export default ActorDetails
