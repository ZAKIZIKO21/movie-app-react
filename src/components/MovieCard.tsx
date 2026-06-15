import type { Movie } from "../types/Movie";
import { useFavorites } from "../context/FavoritesContext";

import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const imageUrl =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const favorite = isFavorite(movie.id);

  return (
  <Link to={`/movie/${movie.id}`}>
    <div className="bg-white rounded-lg shadow overflow-hidden relative">

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
        className="absolute top-2 right-2 text-2xl"
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">
          {movie.title}
        </h2>

        <p>Sortie : {movie.release_date}</p>

        <p>⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  </Link>
);
};

export default MovieCard;