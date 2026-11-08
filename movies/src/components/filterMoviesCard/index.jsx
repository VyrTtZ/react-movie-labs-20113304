import { useContext }  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import { MoviesContext } from "../../contexts/moviesContext";
//-------------------------------------------------------------------------------------------IMPORTS


//-------------------------------------------------------------------------------------------MAIN FUNCTION OF THE DOC
export default function FilterMoviesCard(props) {
  const { media } = useContext(MoviesContext);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres', { media }],
    queryFn: getGenres,
  });
//-------------------------------------------------------------------------------------------ISSUE HANDLING
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

//-------------------------------------------------------------------------------------------RETURN THE HTML CARD TO FILTER MOVIES
  return (
    <Card> 
      <CardContent>
        <Typography >
          <SearchIcon />
          Filter the movies.
        </Typography>
            <TextField
      
      id="filled-search"
      label="Search field"
      type="search"
      variant="filled"
      value={props.titleFilter}
      onChange={handleTextChange}
    />
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
      </CardContent>
      <CardMedia
        sx={{ height: 300}}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography>
          <SearchIcon/>
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}

