import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box"
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import AddToFavoritesIcon from "../cardIcons/addToFavorites"
import AddToHatedIcon from "../cardIcons/addToHated"
import RemoveFromFavoritesIcon from "../cardIcons/removeFromFavorites"
import RemoveFromHatedIcon from "../cardIcons/removeFromHated";
import WriteReviewIcon from "../cardIcons/writeReview";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Rating from "@mui/material/Rating"






export default function MovieCard({ movie }) { 


  const { favorites, addToFavorites, hated, addToHated, media } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

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
  <Card sx={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    width: "100%",
    p: "0",
  }}
  >
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
        {movie.title ?? movie.name}
      </Typography>
    }
  />


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

