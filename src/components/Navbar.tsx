import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-6">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Cinéma
        </Link>

        <div className="flex-1">
          <SearchBar />
        </div>

        <Link to="/favorites">
          Favoris
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;