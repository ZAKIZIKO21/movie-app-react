import { useMovieContext } from "../context/MovieContext";

const SearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
  } = useMovieContext();

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      placeholder="🔍 Rechercher un film..."
      className="
        w-full
        max-w-md
        px-4
        py-2
        rounded-full
        bg-white
        text-black
        border
        border-gray-300
        focus:outline-none
      "
    />
  );
};

export default SearchBar;