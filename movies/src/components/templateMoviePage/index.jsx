import Grid from "@mui/material/Grid";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Box from "@mui/material/Box"


const TemplateMoviePage = ({ movie, children }) => {
  const {media} = useContext(MoviesContext)
  
  const { data, error, isPending, isError } = useQuery({  
    queryKey: ['images', { id: movie.id, media }],
    queryFn: getMovieImages,
  });
  //console.log("movie: ", movie.id);
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const images = data.posters 

return (
  <>
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundImage: `url("https://image.tmdb.org/t/p/w1280${images[0].file_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "grayscale(1) sepia(1) hue-rotate(205deg) saturate(5) contrast(7) brightness(0.6)",
      }}
    />

    <Grid container sx={{ padding: "20px", pt: "130px" }}>
      <Grid size={{ xs: 12, md: 9 }}>
        {children}
      </Grid>
    </Grid>
  </>
);
};

export default TemplateMoviePage;
