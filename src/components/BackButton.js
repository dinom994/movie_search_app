import ArrowLeftIcon from "../ui/ArrowLeftIcon";
import { useNavigate } from "react-router-dom";
import classes from "./BackButton.module.css";
const BackButton = () => {
  const navigate = useNavigate();

  const goBackOnePageHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.bbutton} onClick={goBackOnePageHandler}>
        <ArrowLeftIcon />
    </div>
  );
};

export default BackButton;
