import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import FavoritesPage from "../pages/FavoritesPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/movie/:id"
        element={<MovieDetailsPage />}
      />

      <Route
        path="/favorites"
        element={<FavoritesPage />}
      />
    </Routes>
  );
};

export default AppRouter;