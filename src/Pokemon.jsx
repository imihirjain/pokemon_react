import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12; // Number of cards per page
  const API = "https://pokeapi.co/api/v2/pokemon?limit=144";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      const detailedPokData = data.results.map(async (currElem) => {
        const res = await fetch(currElem.url);
        const data = await res.json();
        return data;
      });
      const detailedData = await Promise.all(detailedPokData);
      setPokemon(detailedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Search Functionality
  const searchData = pokemon.filter((currElem) =>
    currElem.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const totalPage = Math.ceil(searchData.length / perPage);
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const currItem = searchData.slice(firstIndex, lastIndex);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-center text-4xl font-bold mt-12">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-center text-4xl font-bold mt-12">
          {error.message}
        </h1>
      </div>
    );
  }

  return (
    <section className=" mx-auto px-4 py-8 ">
      <header>
        <h1 className="text-xl lg:text-5xl font-bold text-center mb-12">
          Let's Catch Pokémon
        </h1>
      </header>
      <div className="flex justify-center mb-12">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" w-64 sm:w-[32rem] border-b-2 border-[#020d35] py-3 text-lg font-bold bg-[#e91e63] bg-opacity-20 rounded-tl-xl rounded-tr-xl"
        />
      </div>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Display only the paginated items */}
          {currItem.map((currElem) => (
            <PokemonCards key={currElem.id} pokemonData={currElem} />
          ))}
        </ul>
      </div>
      {/* Pagination Control */}
      <div className="flex justify-center mt-8 flex-wrap gap-5">
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 mx-2 font-semibold text-lg rounded-lg transition-colors duration-200 ${
              page === index + 1
                ? "bg-green-500 text-white"
                : "bg-gray-200 hover:bg-green-300"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};
