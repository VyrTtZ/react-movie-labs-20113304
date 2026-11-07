import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
    const [myReviews, setMyReviews] = useState( {} ) 
const [hated, setHated] = useState( [] ) 
const [media, setMedia] = useState("movie");

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addToHated = (movie) => {
	  let newHated = [];
	  if(!hated.includes(movie.id)){
		  newHated = [...hated, movie.id];
	  }
	  else{
		  newHated = [...hated];
	  }
	  setHated(newHated)
  };

const removeFromHated = (movie) => {
	setHated( hated.filter(
		(mId) => mId !== movie.id
	))
};

    const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);


   return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        hated,
	addToHated,
   	removeFromHated,
        addReview,
	media,
	setMedia
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );

};

export default MoviesContextProvider;
