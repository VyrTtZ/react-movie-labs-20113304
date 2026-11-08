import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import { MoviesContext } from "../../contexts/moviesContext";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button"
//-------------------------------------------------------------------------------------------IMPORTS


//-------------------------------------------------------------------------------------------MAIN FUNCTION OF THE DOC
// Card with search, genre, rating and sort controls; reports changes up via props.onUserInput
export default function FilterMoviesCard(props) {
  // Current media type, so the right genre list (movie or TV) is fetched
  const { media } = useContext(MoviesContext);

  // Fetch genres; media is in the key so it refetches when switching movie/TV
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres', { media }],
    queryFn: getGenres,
  });

//-------------------------------------------------------------------------------------------ISSUE HANDLING
  // Show a spinner while loading, or the error message if the request failed
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Add an "All" option at the top of the genre list (only once)
  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  // Shared handler: passes the filter type and new value to the parent
  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

//-------------------------------------------------------------------------------------------RETURN THE HTML CARD TO FILTER MOVIES
  return (
    <Card
      sx={{
        mt: "110px",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <CardContent>
        <Typography>
          <SearchIcon />
          Filter the movies.
        </Typography>

        {/* Search by title/name */}
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        {/* Genre dropdown */}
        <FormControl>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* Rating range slider (0–10 in steps of 0.5) */}
        <Typography>Rating</Typography>
        <Slider
          value={props.ratingRange}
          onChange={(e, value) => props.onUserInput("rating", value)}
          min={0}
          max={10}
          step={0.5}
          valueLabelDisplay="auto"
          sx={{ width: 200, ml: 1 }}
        />
      </CardContent>

      {/* Sort buttons */}
      <Button onClick={() => props.onUserInput("sort", "rating_desc")}>Rating ↓</Button>
      <Button onClick={() => props.onUserInput("sort", "rating_asc")}>Rating ↑</Button>
      <Button onClick={() => props.onUserInput("sort", "title_asc")}>A-Z</Button>
      <Button onClick={() => props.onUserInput("sort", "title_desc")}>Z-A</Button>
      <Button onClick={() => props.onUserInput("sort", "date_desc")}>Newest</Button>
      <Button onClick={() => props.onUserInput("sort", "date_asc")}>Oldest</Button>
    </Card>
  );
}