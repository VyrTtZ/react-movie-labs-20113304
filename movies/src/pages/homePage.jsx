import { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getMovies } from "../api/tmdb-api";

const HomePage = (props) => {
  const [movies, setMovies] = useState([]);
  const favorites = movies.filter(m => m.favorite)
  const hated = movies.filter(m => m.hated)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  localStorage.setItem('hated', JSON.stringify(hated))

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  const addToHated = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, hated: true } : m
    );
    setMovies(updatedMovies);
  }

  useEffect(() => {
    getMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title='Discover Movies'
      movies={movies}
      selectFavorite={addToFavorites}
      selectHated={addToHated}
    />
  );
};
export default HomePage;
