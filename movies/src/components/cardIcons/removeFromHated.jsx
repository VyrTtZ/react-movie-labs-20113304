import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import MoodIcon from "@mui/icons-material/Mood";
import { MoviesContext } from "../../contexts/moviesContext";
//-------------------------------------------------------------------------------------------IMPORTS
const RemoveFromHatedIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromHated = (e) => {
    e.preventDefault();
    context.removeFromHated(movie);
  };
  //-------------------------------------------------------------------------------------------RETURN HTML TO REMOVE FROM Hated
  return (
    <IconButton aria-label="remove from Hated" onClick={handleRemoveFromHated}>
      <MoodIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromHatedIcon;
