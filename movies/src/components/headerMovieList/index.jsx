import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import { MoviesContext } from "../../contexts/moviesContext";
const Header = (props ) => {
  const title = props.title
    const navigate = useNavigate();

return (
  <Paper
    component="div"
    sx={{
      mt: "150px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    }}
  >
    <IconButton aria-label="go back" onClick={() => navigate(-1)}>
      <ArrowBackIcon color="primary" fontSize="large" />
    </IconButton>

    <Typography>{title}</Typography>

    <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
      <ArrowForwardIcon color="primary" fontSize="large" />
    </IconButton>
  </Paper>
);};

export default Header;

