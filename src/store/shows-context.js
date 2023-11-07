import { createContext } from "react";

const ShowsContext = createContext({
  searchedShows: [],
  findSearchedShows: (query) => {},
});

export default ShowsContext;
