import PageTemplate from "../components/templateMovieListPage";

const HatedMoviesPage = (props) => {
  const toDo = () => true;
  const movies = JSON.parse(localStorage.getItem("hated")); 

  return (
    <PageTemplate
      title="Hated Movies"
      movies={movies}
      selectFavorite={toDo}
    />
  );
};

export default HatedMoviesPage;
