import { createContext } from "react";

const MoviesContext = createContext({
  searchedMovies: [],
  findSearchedMovies: (query) => {},
});

export default MoviesContext;
