import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box"
import AddToFavoritesIcon from "../cardIcons/addToFavorites"
import AddToHatedIcon from "../cardIcons/addToHated"
import RemoveFromFavoritesIcon from "../cardIcons/removeFromFavorites"
import RemoveFromHatedIcon from "../cardIcons/removeFromHated";
import WriteReviewIcon from "../cardIcons/writeReview";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Rating from "@mui/material/Rating"






// Horizontal card showing one movie/TV show with its actions
export default function MovieCard({ movie }) { 


  // Lists and actions for the current media type, from context
  const { favorites, addToFavorites, hated, addToHated, media } = useContext(MoviesContext);

  // Flag the movie as a favourite if its id is in the favourites list
  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

   // Flag the movie as hated if its id is in the hated list
   if (hated.find((id) => id === movie.id)) {
    movie.hated = true;
  } else {
    movie.hated = false
  }

  const handleAddToHated = (e) => {
    e.preventDefault();
    addToHated(movie);
  };



  return (
  // Lay the card out as a single row
  <Card sx={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    width: "100%",
    p: "0",
  }}
  >
  {/* Title, with a heart avatar if it's a favourite */}
  <CardHeader
    component="h4"
    sx={{ textAlign: "left", p: "0", ml: "15px", flex: " 220px" }}
    avatar={
      movie.favorite ? (
        <Avatar>
          <FavoriteIcon />
        </Avatar>
      ) : null
    }
    title={
      <Typography>
        {/* Movies use "title", TV shows use "name" */}
        {movie.title ?? movie.name}
      </Typography>
    }
  />


  {/* Release date and star rating (out of 10) */}
  <CardContent sx={{ p: "0", mr: "220px"}}>
    <Grid container>
      <Grid size={{ xs: 6 }}>
        <Typography>
          {movie.release_date}
        </Typography>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Rating
          value={movie.vote_average}
          max={10}
          precision={0.1}
          readOnly
          size="small"
          sx={{ color: "secondary.main" }}
        />
      </Grid>
    </Grid>
  </CardContent>

  {/* Action icons and link to the details page */}
  <CardActions disableSpacing>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        p: "5px",
      }}
    >
      {/* Remove buttons only appear when the movie is already in that list */}
      <AddToFavoritesIcon movie={movie} />
      {movie.favorite ? <RemoveFromFavoritesIcon movie={movie} /> : null}

      <AddToHatedIcon movie={movie} />
      {movie.hated ? <RemoveFromHatedIcon movie={movie} /> : null}

      <WriteReviewIcon movie={movie} />

      <Link to={`/${media}/${movie.id}`}>
        <Button variant="outlined" size="medium" color="primary">
          Details
        </Button>
      </Link>
    </Box>
  </CardActions>
</Card>
);
}