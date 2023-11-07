import { Link } from "react-router-dom";
import classes from "./MovieCard.module.css";

const MovieCard = ({ movieObject }) => {

  return (
    <Link to={movieObject.imdbID} className={classes.card}>
      <img src={movieObject.Poster} alt={movieObject.Title} />
      <h3>{movieObject.Title}</h3>
    </Link>
  );
};

export default MovieCard;
