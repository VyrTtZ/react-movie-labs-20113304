
//-------------------------------------------------------------------------------------------GET MOVIES HOMEPAGE API CALL
export const getMovies = ({queryKey}) => {
  const [, pagePart] = queryKey;
  const { media,  page } = pagePart;
  return fetch(
    `https://api.themoviedb.org/3/discover/${media}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

//-------------------------------------------------------------------------------------------GET MOVIES LIST OTHER PAGES API CALL
export const getMoviesList = ({queryKey}) => {
  const [, pagePart] = queryKey;
  const {type, page, media } = pagePart;
const temp = media === "tv" && type === "now_playing" ? "airing_today" : type;
  return fetch(
    `https://api.themoviedb.org/3/${media}/${temp}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

//-------------------------------------------------------------------------------------------GET SINGULAR MOVIE API CALL
export const getMovie = ({ queryKey }) => {
  const [, { id, media }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
}

//-------------------------------------------------------------------------------------------GET GENRES OF A MEDIA CATEGORY

export const getGenres = ({queryKey}) => {
  const [, {media}] = queryKey;
	return fetch(
    `https://api.themoviedb.org/3/genre/${media}/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

//-------------------------------------------------------------------------------------------GET IMAGES OF A SPECIFIC MOVIE
export const getMovieImages = ({ queryKey }) => {
    const [, { id, media }] = queryKey;
    return fetch(
      `https://api.themoviedb.org/3/${media}/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
  });
  };

//-------------------------------------------------------------------------------------------GET REVIEWS OF A SPECIFIC MOVIE
export const getMovieReviews = ({ queryKey }) => {
	const [, idPart] = queryKey;
	const { id, media } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/${media}/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

//-------------------------------------------------------------------------------------------GET ALL THE UPCOMING MOVIES
export const getUpcomingMovies = ({ queryKey }) => {
  const [, { media, page }] = queryKey;
  const path = media === "tv" ? "tv/on_the_air" : "movie/upcoming";
  return fetch(
    `https://api.themoviedb.org/3/${path}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

//-------------------------------------------------------------------------------------------GET PAGE OF RECOMMENDATIONS BASED ON A SPECIFIC MOVIE
export const getRecommendations = ({ queryKey }) => {
	const [, { id, media }] = queryKey;
	return fetch(
		`https://api.themoviedb.org/3/${media}/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
	  if (!response.ok) {
		  return response.json().then((error) => {
			  throw new Error(error.status_message || "Something went wrong");
		  });
	  }
	  return response.json();
  });
};