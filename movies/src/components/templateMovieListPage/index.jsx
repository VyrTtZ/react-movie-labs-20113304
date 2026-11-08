import { useState, useContext } from "react";
import Footer from "../footer";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import { MoviesContext } from "../../contexts/moviesContext";
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar";
function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const { media } = useContext(MoviesContext);
  let displayedMovies = movies
    .filter((m) => {
      console.log("name", m.name ?? "undefined");
      console.log("title", m.title ?? "undefined")
      console.log(media === "tv")
  const title = m.title ?? m.name;
  console.log(title)
  return title.toLowerCase().includes(nameFilter.toLowerCase());
}).filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  
console.log(title)
return (
  <>
  <Toolbar 
  sx={{ 
        mt: "110px", 
                width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "nowrap",

         }}>
        onUserInput={handleChange}
    titleFilter={nameFilter}
    genreFilter={genreFilter}
  </Toolbar>

    <Grid container spacing={3} >


  <MovieList action={action} movies={displayedMovies} />
</Grid>

    <Footer page={page} totalPages={totalPages} onChange={onPageChange} />
  </>
);
};
export default MovieListPageTemplate;
