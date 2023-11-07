import { useParams } from "react-router-dom";
import { useState } from "react";
import classes from "./PlotDetails.module.css";
const API_URL = "http://www.omdbapi.com/?apikey=f51ddc1a";

const PlotDetails = () => {
  const params = useParams();
  
  const [chosenShowPoster, setChosenShowPoster] = useState("");
  const [chosenShowTitle, setChosenShowTitle] = useState("");
  const [chosenShowPlot, setChosenShowPlot] = useState("");

  fetch(`${API_URL}&i=${params.imdbID}&plot=full`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("NE VALJA BRUDA");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data) {
        setChosenShowPoster(data.Poster);
        setChosenShowTitle(data.Title);
        setChosenShowPlot(data.Plot);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className={classes.image}>
      <img src={chosenShowPoster} alt={chosenShowTitle} />
      <h3>{chosenShowTitle}</h3>
      <p>
        Movie overview: <br /> {chosenShowPlot}
      </p>
    </div>
  );
};

export default PlotDetails;
