
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import MoodBad from "@mui/icons-material/MoodBad";
//-------------------------------------------------------------------------------------------IMPORTS
const AddToHatedIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToHated = (e) => {
    e.preventDefault();
    context.addToHated(movie);
  };
//-------------------------------------------------------------------------------------------RETURN HTML TO ADD TO HATED
  return (
    <IconButton aria-label="add to hated" onClick={handleAddToHated}>
      <MoodBad color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToHatedIcon;
