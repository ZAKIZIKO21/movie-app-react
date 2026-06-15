import { useEffect, useState } from "react";

import apiTMDB from "../services/apiTMDB";
import type { Movie } from "../types/Movie";

import MovieCard from "../components/MovieCard";

import { useMovieContext } from "../context/MovieContext";

const HomePage = () => {
  const { searchTerm } = useMovieContext();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const endpoint =
          searchTerm.trim() === ""
            ? "/movie/popular"
            : "/search/movie";

        const response = await apiTMDB.get(endpoint, {
          params:
            searchTerm.trim() !== ""
              ? { query: searchTerm }
              : {},
        });

        setMovies(response.data.results);
      } catch (error) {
        console.error("Erreur API TMDb :", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMovies();
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Chargement...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {searchTerm
          ? `Résultats pour : "${searchTerm}"`
          : "Films populaires"}
      </h1>

      {movies.length === 0 ? (
        <p className="text-gray-500">
          Aucun film trouvé.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
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

export default HomePage;