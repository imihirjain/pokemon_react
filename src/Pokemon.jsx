import { useEffect, useState } from "react";
import "./index.css";
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
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Lets Catch Pokémon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <ul className="cards">
          {/* Display only the paginated items */}
          {currItem.map((currElem) => (
            <PokemonCards key={currElem.id} pokemonData={currElem} />
          ))}
        </ul>
      </div>
      {/* Pagination Control */}
      <div className="pagination">
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${page === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};
