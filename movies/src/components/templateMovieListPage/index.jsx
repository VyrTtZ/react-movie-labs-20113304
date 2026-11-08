import { useState, useContext } from "react";
import Footer from "../footer";
import MovieList from "../movieList";
import FilterMoviesCard from "../filterMoviesCard";
import List from "@mui/material/List"

// Reusable page layout: filter card, filtered/sorted movie list, and pagination footer
function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {

  // Filter and sort settings controlled by FilterMoviesCard
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0"); // "0" means all genres
  const [ratingRange, setRatingRange] = useState([0, 10]); // [min, max] rating
  const [sortBy, setSortBy] = useState("none");

  // Genre comes in as a string, so convert it for comparison with genre_ids
  const genreId = Number(genreFilter);

  let displayedMovies = movies.
  
  // Filter by name (movies use "title", TV shows use "name")
  filter((m) => {
    //console.log("name", m.name ?? "undefined");
    //console.log("title", m.title ?? "undefined")
    //console.log(media === "tv")
    const title = m.title ?? m.name;
    //console.log(title)
    return title.toLowerCase().includes(nameFilter.toLowerCase());
  }).
  
  // Filter by genre, skipped when "all genres" (0) is selected
  filter((m) => {
    return genreId > 0 ? m.genre_ids.includes(genreId) : true;
  }).
  
  // Keep only items whose rating falls within the selected range
  filter((m) => {
    const r = m.vote_average ?? 0;
    return r >= ratingRange[0] && r <= ratingRange[1];
  });

  // Copy before sorting so the filtered array isn't mutated
  const sorted = [...displayedMovies];

  // Apply the chosen sort; title and date fall back to TV field names (name, first_air_date)
  if (sortBy === "rating_desc") sorted.sort((a, b) => b.vote_average - a.vote_average);
  if (sortBy === "rating_asc")  sorted.sort((a, b) => a.vote_average - b.vote_average);
  if (sortBy === "title_asc")   sorted.sort((a, b) => (a.title ?? a.name ?? "").localeCompare(b.title ?? b.name ?? ""));
  if (sortBy === "title_desc")  sorted.sort((a, b) => (b.title ?? b.name ?? "").localeCompare(a.title ?? a.name ?? ""));
  if (sortBy === "date_desc")   sorted.sort((a, b) => (b.release_date ?? b.first_air_date ?? "").localeCompare(a.release_date ?? a.first_air_date ?? ""));
  if (sortBy === "date_asc")    sorted.sort((a, b) => (a.release_date ?? a.first_air_date ?? "").localeCompare(b.release_date ?? b.first_air_date ?? ""));

  // Single handler passed to the filter card; updates whichever setting changed
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingRange(value);
    else if (type === "sort") setSortBy(value);
};



  
console.log(title)
return (
  <>
  {/* Filter and sort controls */}
  <FilterMoviesCard
  onUserInput={handleChange}
  titleFilter={nameFilter}
  genreFilter={genreFilter}
  ratingRange={ratingRange}
/>
  

    {/* The filtered and sorted results */}
    <List container spacing={3} >


  <MovieList action={action} movies={sorted} />
</List>

    {/* Pagination controls */}
    <Footer page={page} totalPages={totalPages} onChange={onPageChange} />
  </>
);
};
export default MovieListPageTemplate;