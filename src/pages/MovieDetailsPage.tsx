import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiTMDB from "../services/apiTMDB";
import type { Movie } from "../types/Movie";

import { useFavorites } from "../context/FavoritesContext";

import ReviewForm from "../components/ReviewForm";

import {
  useReviews,
  type Review,
} from "../hooks/useReviews";

interface Actor {
  id: number;
  name: string;
}

interface MovieDetails extends Movie {
  genres: {
    id: number;
    name: string;
  }[];
}

const MovieDetailsPage = () => {
  const { id } = useParams();

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const {
    reviews,
    addReview,
    updateReview,
    deleteReview,
  } = useReviews(Number(id));

  const [movie, setMovie] =
    useState<MovieDetails | null>(null);

  const [actors, setActors] =
    useState<Actor[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [editingReview, setEditingReview] =
    useState<Review | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        const movieRes =
          await apiTMDB.get(
            `/movie/${id}`
          );

        const creditsRes =
          await apiTMDB.get(
            `/movie/${id}/credits`
          );

        setMovie(movieRes.data);

        setActors(
          creditsRes.data.cast.slice(
            0,
            5
          )
        );
      } catch (error) {
        console.error(
          "Erreur details movie:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Chargement...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center mt-10">
        Film introuvable
      </div>
    );
  }

  const imageUrl =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const favorite =
    isFavorite(movie.id);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-72 rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">
            {movie.title}
          </h1>

          <p className="mt-2 text-gray-600">
            {movie.release_date}
          </p>

          <p className="mt-2">
            ⭐ {movie.vote_average}
          </p>

          <p className="mt-4">
            {movie.overview}
          </p>

          <div className="mt-4">
            <strong>
              Genres :
            </strong>{" "}
            {movie.genres
              .map(
                (genre) =>
                  genre.name
              )
              .join(", ")}
          </div>

          <div className="mt-4">
            <strong>
              Acteurs :
            </strong>{" "}
            {actors
              .map(
                (actor) =>
                  actor.name
              )
              .join(", ")}
          </div>

          <button
            onClick={() =>
              toggleFavorite(movie)
            }
            className="
              mt-6
              px-4
              py-2
              rounded
              bg-red-500
              text-white
            "
          >
            {favorite
              ? "❤️ Retirer des favoris"
              : "🤍 Ajouter aux favoris"}
          </button>
        </div>
      </div>

      <div className="mt-10">
        <ReviewForm
          movieId={movie.id}
          editingReview={
            editingReview
          }
          onSubmitReview={(
            reviewData
          ) => {
            if (
              editingReview
            ) {
              updateReview({
                ...editingReview,
                ...reviewData,
              });

              setEditingReview(
                null
              );
            } else {
              addReview(
                reviewData
              );
            }
          }}
        />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Avis utilisateurs
          </h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500">
              Aucun avis pour ce
              film.
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map(
                (review) => (
                  <div
                    key={
                      review.id
                    }
                    className="
                      border
                      rounded-lg
                      p-4
                      bg-white
                      shadow
                    "
                  >
                    <p className="font-bold">
                      {
                        review.name
                      }
                    </p>

                    <p>
                      {"⭐".repeat(
                        review.rating
                      )}
                    </p>

                    <p className="mt-2">
                      {
                        review.comment
                      }
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() =>
                          setEditingReview(
                            review
                          )
                        }
                        className="
                          px-3
                          py-1
                          bg-yellow-500
                          text-white
                          rounded
                        "
                      >
                        Modifier
                      </button>

                      <button
                        onClick={() =>
                          deleteReview(
                            review.id
                          )
                        }
                        className="
                          px-3
                          py-1
                          bg-red-600
                          text-white
                          rounded
                        "
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;