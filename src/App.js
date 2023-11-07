import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import ShowsDetailsPage from "./pages/ShowsDetails";
import MoviesPage from "./pages/Movies";
import MoviesRootPage from "./pages/MoviesRoot";
import TVShowsPage from "./pages/TVShows";
import TVShowsRootPage from "./pages/TVShowsRoot";
import MoviesProvider from "./store/MoviesProvider";
import ShowsProvider from "./store/ShowsProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <MoviesRootPage />,
        children: [
          {
            index: true,
            element: <MoviesPage />,
          },
          {
            path: ":imdbID",
            element: <ShowsDetailsPage />,
          },
        ] 
      },
      {
        path: "tvshows",
        element: <TVShowsRootPage />,
        children: [
          {
            index: true,
            element: <TVShowsPage />,
          },
          {
            path: ":imdbID",
            element: <ShowsDetailsPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <MoviesProvider>
      <ShowsProvider>
        <RouterProvider router={router} />
      </ShowsProvider>
    </MoviesProvider>
  );
};

export default App;
