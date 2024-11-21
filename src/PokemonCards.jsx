export const PokemonCards = ({ pokemonData }) => {
  return (
    <li className="w-full overflow-x-hidden mx-auto min-h-[22rem] flex flex-col bg-white shadow-xl rounded-xl p-6 relative hover:scale-105 transition-all duration-300 ease-in-out space-y-4">
      <figure className="flex justify-center filter drop-shadow-[0px_50px_100px_rgba(50,50,93,0.25)]">
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="w-3/5 h-[15rem]"
        />
      </figure>
      <h1 className="text-center text-3xl capitalize mt-6">
        {pokemonData.name}
      </h1>
      <div className="flex justify-center items-center my-4">
        <p className="px-6 py-2 rounded-full bg-green-400 text-white font-bold capitalize">
          {pokemonData.types.map((currType) => currType.type.name).join(", ")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center mt-6">
        <p className="font-bold">
          <span className="font-semibold">Height:</span> {pokemonData.height}
        </p>
        <p className="font-bold">
          <span className="font-semibold">Weight:</span> {pokemonData.weight}
        </p>
        <p className="font-bold">
          <span className="font-semibold">Speed:</span>{" "}
          {pokemonData.stats[5].base_stat}
        </p>
        <div className="font-bold">
          <p>{pokemonData.base_experience}</p>
          <span className="font-semibold">Experience:</span>
        </div>
        <div className="font-bold">
          <p>{pokemonData.stats[1].base_stat}</p>
          <span className="font-semibold">Attack:</span>
        </div>
        <div className="font-bold">
          <p>
            {pokemonData.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)
              .join(", ")}
          </p>
          <span className="font-semibold">Abilities:</span>
        </div>
      </div>
    </li>
  );
};
