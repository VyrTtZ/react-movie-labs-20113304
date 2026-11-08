import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import HubIcon from "@mui/icons-material/Hub";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";


const MovieDetails = ({ movie }) => {  // Don't miss this!
const [drawerOpen, setDrawerOpen] = useState(false);
 const {media} = useContext(MoviesContext)

if(media === "tv"){
  return (
    <>
      <Typography>
        Overview
      </Typography>

      <Typography>
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name}  />
          </li>
        ))}
      </Paper>
      <Paper component="ul" >
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
        <Paper 
        component="ul" 
      >
        <li>
          <Chip label="Production countries"  color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
	))}
	<li>
		<Chip
		label={movie.title ?? movie.name}
    component={Link}
    to={`/${media}/${movie.id}/recommendations`}
    clickable
		/>
	</li>
	  </Paper>
      </Paper>
            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      </>
  );
} else{
  return (
    <>
      <Typography >
        Overview
      </Typography>

      <Typography >
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
      >
        <li>
          <Chip label="Genres" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name}  />
          </li>
        ))}
      </Paper>
      <Paper component="ul" >
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
        <Paper 
        component="ul" 
      >
        <li>
          <Chip label="Production countries"  color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
	))}
	<li>
		<Chip
		label={movie.title ?? movie.name}
    component={Link}
    to={`/${media}/${movie.id}/recommendations`}
    clickable
		/>
	</li>
	  </Paper>
      </Paper>
            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      </>
  );
}
};
export default MovieDetails ;
