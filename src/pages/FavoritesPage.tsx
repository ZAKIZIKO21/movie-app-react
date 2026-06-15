import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Mes favoris ❤️
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">
          Aucun film en favori.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;