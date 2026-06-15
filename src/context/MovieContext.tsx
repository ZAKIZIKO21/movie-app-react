import {
  createContext,
  useContext,
  useState,
  
} from "react";
import type { ReactNode } from "react";

interface MovieContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const MovieContext =
  createContext<MovieContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({
  children,
}: ProviderProps) => {
  const [searchTerm, setSearchTerm] =
    useState("");

  return (
    <MovieContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context =
    useContext(MovieContext);

  if (!context) {
    throw new Error(
      "useMovieContext doit être utilisé dans MovieProvider"
    );
  }

  return context;
};