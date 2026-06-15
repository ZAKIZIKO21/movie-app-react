import {
  createContext,
  useContext,
  useEffect,
  useState,
  
} from "react";
import type { ReactNode } from "react";

import type { Movie } from "../types/Movie";

interface FavoritesContextType {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext =
  createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = "favorites_movies";

export const FavoritesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // load localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // save localStorage
  const save = (data: Movie[]) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  };

  // add/remove
  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);

      let updated;

      if (exists) {
        updated = prev.filter((m) => m.id !== movie.id);
      } else {
        updated = [...prev, movie];
      }

      save(updated);
      return updated;
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((m) => m.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
};