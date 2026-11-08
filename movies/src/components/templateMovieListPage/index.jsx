import { useState, useContext } from "react";
import Header from "../headerMovieList";
import Footer from "../footer";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import { MoviesContext } from "../../contexts/moviesContext";

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
    <Grid container spacing={2} sx={{ padding: "20px" }}>
      <Grid size={12}>
        <Header title={movies.title ?? movies.name} />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
        />
      </Grid>

      <MovieList action={action} movies={displayedMovies} />
    </Grid>

    <Footer page={page} totalPages={totalPages} onChange={onPageChange} />
  </>
);};
export default MovieListPageTemplate;
