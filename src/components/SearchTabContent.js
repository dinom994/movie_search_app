import { useContext, useEffect, useState } from "react";
import MagnifierIcon from "../ui/MagnifierIcon";
import classes from "./SearchTabContent.module.css";
import MovieCard from "./MovieCard";
import MoviesContext from "../store/movies-context";
import ShowsContext from "../store/shows-context";
import LoadingPage from "../ui/LoadingPage";

const SearchBar = (props) => {
  window.addEventListener("beforeunload", () => {
    localStorage.clear();
  });

  const moviesCtx = useContext(MoviesContext);
  const showsCtx = useContext(ShowsContext);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery) {
      setQuery(storedQuery);
    }
  }, []);

  const inputChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("searchQuery", query);
    if (query.length > 2) {
      setIsLoading(true);
      let timer;
      if (props.type === "movie") {
        timer = setTimeout(() => {
          moviesCtx.findSearchedMovies(query);
          setIsLoading(false);
        }, 2000);
      } else if (props.type === "series") {
        timer = setTimeout(() => {
          showsCtx.findSearchedShows(query);
          setIsLoading(false);
        }, 2000);
      }
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [query]);

  return (
    <>
      <div className={classes["search-box"]}>
        <span className={classes["search-box__icon"]}>
          <MagnifierIcon />
        </span>
        <input
          type="text"
          value={query}
          className={classes["search-box__input"]}
          placeholder="Search"
          onChange={inputChangeHandler}
        />
      </div>
      {isLoading && <LoadingPage />}
      {query.length > 2 && (
        <ul className={classes["card-container"]}>
          {props.type === "movie" &&
            moviesCtx.searchedMovies.map((show) => (
              <MovieCard key={show.imdbID} movieObject={show} />
            ))}
          {props.type === "series" &&
            showsCtx.searchedShows.map((show) => (
              <MovieCard key={show.imdbID} movieObject={show} />
            ))}
        </ul>
      )}
    </>
  );
};

export default SearchBar;
