import classes from './LoadingPage.module.css';

const LoadingPage = () => {
    return (
        <div className={classes["loading-page"]}>
          <div className={classes["loader"]}></div>
          <h1>Loading...</h1>
        </div>
      );
};

export default LoadingPage;