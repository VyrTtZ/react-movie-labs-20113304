import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import StarRate from "@mui/icons-material/StarRate";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

const ActorDetails = ({ actor }) => {
  return (
    <>
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

    </>
  );
};

export default ActorDetails
