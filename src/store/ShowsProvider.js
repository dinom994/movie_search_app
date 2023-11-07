import ShowsContext from "./shows-context";
import { useReducer } from "react";
const API_URL = "http://www.omdbapi.com/?apikey=f51ddc1a";

const defaultShowsState = {
  searchedShows: [],
};

const showsReducer = (state, action) => {
  if (action.type === "SHOWSEARCHED") {
    return action.updatedState;
  }

  return state;
};

const ShowsProvider = (props) => {
  const [showsState, dispatchShowsAction] = useReducer(
    showsReducer,
    defaultShowsState
  );

  

  const findSearchedShowsHandler = (query) => {
    fetch(`${API_URL}&type=series&s=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("NE VALJA BRUDA");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.Search) {
          const updatedState = { ...showsState, searchedShows: data.Search };
          dispatchShowsAction({type: "SHOWSEARCHED", updatedState})
        } else {
          const updatedState = { ...showsState, searchedShows: [] };
          dispatchShowsAction({type: "SHOWSEARCHED", updatedState})
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showsContext = {
    searchedShows: showsState.searchedShows,
    findSearchedShows: findSearchedShowsHandler,
  };

  return (
    <ShowsContext.Provider value={showsContext}>
      {props.children}
    </ShowsContext.Provider>
  );
};

export default ShowsProvider;
