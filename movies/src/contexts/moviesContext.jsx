import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [media, setMedia] = useState("movie");
  const [myReviews, setMyReviews] = useState({});
  const [favLists, setFavLists] = useState({ movie: [], tv: [] });
  const [hatedLists, setHatedLists] = useState({ movie: [], tv: [] });

  const favorites = favLists[media];
  const hated = hatedLists[media];

  const addToList = (setLists) => (movie) =>
    setLists((prev) =>
      prev[media].includes(movie.id) ? prev : { ...prev, [media]: [...prev[media], movie.id] }
    );

  const removeFromList = (setLists) => (movie) =>
    setLists((prev) => ({
      ...prev, [media]: prev[media].filter((id) => id !== movie.id),
    }));

  const addToFavorites = addToList(setFavLists);
  const removeFromFavorites = removeFromList(setFavLists);
  const addToHated = addToList(setHatedLists);
  const removeFromHated = removeFromList(setHatedLists);

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [`${media}-${movie.id}`]: review });
  };

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
