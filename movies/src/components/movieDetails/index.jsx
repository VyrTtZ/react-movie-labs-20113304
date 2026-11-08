import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";


// Detail panel for a single movie or TV show
const MovieDetails = ({ movie }) => { 
// Controls whether the reviews drawer is open
const [drawerOpen, setDrawerOpen] = useState(false);
 // Current media type ("movie" or "tv") from context
 const {media} = useContext(MoviesContext)

// TV layout: same as movies but without the revenue chip
if(media === "tv"){
  return (
    <>
      <Typography>
        Overview
      </Typography>

      <Typography>
        {movie.overview}
      </Typography>

      {/* Genre chips */}
      <Paper 
        component="ul" 
      >
        <li>
          <Chip label="Genres" color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name}  />
          </li>
        ))}
      </Paper>
      {/* Runtime, rating (vote count) and release date */}
      <Paper component="ul" >
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
        {/* Production countries, plus links to recommendations and cast pages */}
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
		label="Recommendations"
    component={Link}
    to={`/${media}/${movie.id}/recommendations`}
    clickable
		/>
	</li>

	<li>
		<Chip
		label="Cast"
    component={Link}
    to={`/${media}/${movie.id}/credits`}
    clickable
		/>
	</li>
	  </Paper>
      </Paper>
            {/* Button that opens the reviews drawer */}
            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      {/* Reviews slide down from the top; media is passed so TV reviews are fetched */}
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} media={media} />
      </Drawer>

      </>
  );
// Movie layout: includes a revenue chip
} else{
  return (
    <>
      <Typography >
        Overview
      </Typography>

      <Typography >
        {movie.overview}
      </Typography>

      {/* Genre chips */}
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
      {/* Runtime, revenue, rating (vote count) and release date */}
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
        {/* Production countries, plus links to recommendations and cast pages */}
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
		label="Recommendations"
    component={Link}
    to={`/${media}/${movie.id}/recommendations`}
    clickable
		/>
	</li>

	<li>
		<Chip
		label="Cast"
    component={Link}
    to={`/${media}/${movie.id}/credits`}
    clickable
		/>
	</li>
	  </Paper>
      </Paper>
            {/* Button that opens the reviews drawer */}
            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      {/* Reviews slide down from the top */}
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      </>
  );
}
};
export default MovieDetails ;