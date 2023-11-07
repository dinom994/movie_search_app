import { useReducer } from "react";
import MoviesContext from "./movies-context";
const API_URL = "http://www.omdbapi.com/?apikey=f51ddc1a";

const defaultMoviesState = {
  searchedMovies: [],
};

const moviesReducer = (state, action) => {
  if (action.type === "SHOWSEARCHED") {
    return action.updatedState;
  }

  return state;
};

const MoviesProvider = (props) => {
  const [moviesState, dispatchMoviesAction] = useReducer(
    moviesReducer,
    defaultMoviesState
  );

  const findSearchedMoviesHandler = (query) => {
    
    fetch(`${API_URL}&type=movie&s=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("NE VALJA BRUDA");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.Search) {
          const updatedState = { ...moviesState, searchedMovies: data.Search };
          dispatchMoviesAction({type: "SHOWSEARCHED", updatedState})
        } else {
          const updatedState = { ...moviesState, searchedMovies: [] };
          dispatchMoviesAction({type: "SHOWSEARCHED", updatedState})
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const moviesContext = {
    searchedMovies: moviesState.searchedMovies,
    findSearchedMovies: findSearchedMoviesHandler,
  };

  return (
    <MoviesContext.Provider value={moviesContext}>
      {props.children}
    </MoviesContext.Provider>
  );
};
export default MoviesProvider;
