
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import MoodBad from "@mui/icons-material/MoodBad";

const AddToHatedIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToHated = (e) => {
    e.preventDefault();
    context.addToHated(movie);
  };

  return (
    <IconButton aria-label="add to hated" onClick={handleAddToHated}>
      <Icon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToHatedIcon;
