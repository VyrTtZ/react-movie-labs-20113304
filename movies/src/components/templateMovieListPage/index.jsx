import { useState, useContext } from "react";
import Footer from "../footer";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import { MoviesContext } from "../../contexts/moviesContext";
import FilterMoviesCard from "../filterMoviesCard";
import List from "@mui/material/List"
function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingRange, setRatingRange] = useState([0, 10]);
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
  })
  .filter((m) => {
    return genreId > 0 ? m.genre_ids.includes(genreId) : true;
  })
  .filter((m) => {
    const r = m.vote_average ?? 0;
    return r >= ratingRange[0] && r <= ratingRange[1];
  });

  const handleChange = (type, value) => {
  if (type === "name") setNameFilter(value);
  else if (type === "genre") setGenreFilter(value);
  else if (type === "rating") setRatingRange(value);
};

  
console.log(title)
return (
  <>
  <FilterMoviesCard
  onUserInput={handleChange}
  titleFilter={nameFilter}
  genreFilter={genreFilter}
  ratingRange={ratingRange}
/>
  

    <List container spacing={3} >


  <MovieList action={action} movies={displayedMovies} />
</List>

    <Footer page={page} totalPages={totalPages} onChange={onPageChange} />
  </>
);
};
export default MovieListPageTemplate;
