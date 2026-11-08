import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodBadIcon from "@mui/icons-material/MoodBad";
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
    <Card>
                  <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography>
            {movie.title ?? movie.name}{" "}
          </Typography>
        }
      />


      <CardMedia
	  sx={{ height: "300px" }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{xs: 6}}>
            <Typography >
              <CalendarIcon />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography>
              <StarRateIcon />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      
          <AddToFavoritesIcon movie={movie} />
          <AddToHatedIcon movie={movie} />
          <RemoveFromFavoritesIcon movie={movie} />
          <WriteReviewIcon movie={movie} />
          <RemoveFromHatedIcon movie={movie} />
      
        <Link to={`/${media}/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            Details
          </Button>
        </Link>
        
      </CardActions>

    </Card>
  );
}

