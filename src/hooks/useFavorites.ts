import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";

const FAVORITES_KEY = "favorites_movies";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // charger depuis LocalStorage au démarrage
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // sauvegarder automatiquement
  const saveToStorage = (data: Movie[]) => {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(data)
    );
  };

  // ajouter / retirer toggle
  const toggleFavorite = (movie: Movie) => {
    const exists = favorites.some(
      (m) => m.id === movie.id
    );

    let updated: Movie[];

    if (exists) {
      updated = favorites.filter(
        (m) => m.id !== movie.id
      );
    } else {
      updated = [...favorites, movie];
    }

    setFavorites(updated);
    saveToStorage(updated);
  };

  // vérifier si favori
  const isFavorite = (id: number) => {
    return favorites.some((m) => m.id === id);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};