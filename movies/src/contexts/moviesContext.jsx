import React, { useState } from "react";

// Context consumed via useContext(MoviesContext)
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [media, setMedia] = useState("movie"); // active media type: "movie" or "tv"
  const [myReviews, setMyReviews] = useState({}); // reviews keyed by id: { [id]: review }
  // Favourite and hated ids, stored separately per media type
  const [favLists, setFavLists] = useState({ movie: [], tv: [] });
  const [hatedLists, setHatedLists] = useState({ movie: [], tv: [] });

  // Only expose the lists for the currently selected media type
  const favorites = favLists[media];
  const hated = hatedLists[media];

  // Curried helper: takes a state setter, returns a function that adds a movie's id
  // to the current media's list (ignored if already present)
  const addToList = (setLists) => (movie) =>
    setLists((prev) =>
      prev[media].includes(movie.id) ? prev : { ...prev, [media]: [...prev[media], movie.id] }
    );

  // Curried helper: removes a movie's id from the current media's list only
  const removeFromList = (setLists) => (movie) =>
    setLists((prev) => ({
      ...prev, [media]: prev[media].filter((id) => id !== movie.id),
    }));

  // Concrete actions built from the helpers above
  const addToFavorites = addToList(setFavLists);
  const removeFromFavorites = removeFromList(setFavLists);
  const addToHated = addToList(setHatedLists);
  const removeFromHated = removeFromList(setHatedLists);

  // Add or replace the review for a movie
  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

// Share state and actions with all child components
return (
  <MoviesContext.Provider
    value={{
      favorites, addToFavorites, removeFromFavorites,
      hated, addToHated, removeFromHated,
      addReview, myReviews,
      media, setMedia,
    }}
  >
    {props.children}
  </MoviesContext.Provider>
);
};

export default MoviesContextProvider;