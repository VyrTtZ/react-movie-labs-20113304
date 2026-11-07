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

export const getMoviesList = ({queryKey}) => {
  const [, pagePart] = queryKey;
  const { type, page, media } = pagePart;
  return fetch(
    `https://api.themoviedb.org/3/${media}/${type}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
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
export const getMovie = (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id, media } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
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

  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id, media } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/${media}/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
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

export const getRecommendations = ({ queryKey }) => {
	const [, idPart] = queryKey;
	const { id } = idPart;
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


export const getCompanies = ({ queryKey }) => {
	const [, idPart] = queryKey;
	const { id } = idPart;
	return fetch(
		`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
	  if (!response.ok) {
		  return response.json().then((error) => {
			  throw new Error(error.status_message || "Something went wrong");
		  });
	  }
	  return response.json();
  });
};
