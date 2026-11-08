
//-------------------------------------------------------------------------------------------GET MOVIES HOMEPAGE API CALL
// Fetches a page of movies or TV shows from TMDB's discover endpoint
export const getMovies = ({queryKey}) => {
  // queryKey looks like ["key", { media, page }]
  const [, pagePart] = queryKey;
  const { media,  page } = pagePart;
  return fetch(
    `https://api.themoviedb.org/3/discover/${media}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    // On a failed request, throw TMDB's error message so React Query reports it
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
// Fetches a page from a list endpoint such as top_rated or now_playing
export const getMoviesList = ({queryKey}) => {
  const [, pagePart] = queryKey;
  const {type, page, media } = pagePart;
// TV has no "now_playing" list, so use "airing_today" instead
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
// Fetches full details for one movie or TV show by id
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
// Fetches the genre list for movies or TV (the two have different genres)

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
// Fetches posters and backdrops for one movie or TV show
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
// Fetches reviews and returns just the results array (no error check here)
export const getMovieReviews = ({ queryKey }) => {
	const [, { id, media }] = queryKey;
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
// Upcoming movies, or for TV, shows currently on the air
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
// Fetches the first page of recommendations similar to the given movie or show
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
//-------------------------------------------------------------------------------------------GET PAGE OF CREDITS BASED ON A SPECIFIC MOVIE
// Fetches cast and crew for a movie or TV show
export const getCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { media, id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/${media}/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};
//-------------------------------------------------------------------------------------------GET DATA ABOUT A SPECIFIC ACTOR
// Fetches an actor's profile (bio, birthday, photo, etc.)
export const getActor = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

//-------------------------------------------------------------------------------------------GET PAGE OF MOVIES WITH A SPECIFIC ACTOR IN THEM
// Fetches the movies an actor has appeared in (movies only, not TV)
export const getActorsMovies = ({ queryKey }) => {
  const [, { id}] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};