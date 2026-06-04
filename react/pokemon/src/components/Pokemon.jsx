import { useState } from "react";
import "../styles/Colors.css";
import "../styles/Style.css";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const PokemonStats = ({ pokemon }) => {
  const { weight, baseXP, hp, attack, defense, speed } = pokemon;
  const stats = [
    { label: "Weight", value: weight },
    { label: "Base XP", value: baseXP },
    { label: "HP", value: hp },
    { label: "Attack", value: attack },
    { label: "Defense", value: defense },
    { label: "Speed", value: speed },
  ];
  return (
    <table className="table grey-font">
      <tbody>
        {stats.map(({ label, value }, idx) => (
          <tr key={idx}>
            <td className="bold">{label}</td>
            <td className="align-right">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PokemonTypes = ({ types }) => (
  <div className="flex pokemon-types">
    {types.map((type, idx) => (
      <div className={`pokemon-type white-font ${type}`} key={idx}>
        {capitalize(type)}
      </div>
    ))}
  </div>
);

const PokemonName = ({ name }) => (
  <h2 className="grey-font bold">{capitalize(name)}</h2>
);

const PokemonHeader = ({ name, types }) => (
  <div className="pokemon-header flex">
    <PokemonName name={name} />
    <PokemonTypes types={types} />
  </div>
);

const PokemonDetails = ({ pokemon }) => (
  <div className="details">
    <PokemonHeader name={pokemon.name} types={pokemon.types} />
    <PokemonStats pokemon={pokemon} />
  </div>
);

const PokemonImage = ({ image, name }) => (
  <div className="image-container">
    <img src={image} alt={name} className="image"></img>
  </div>
);

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="card">
      {/* <PokemonImage image={pokemon.image} name={pokemon.name} /> */}
      <PokemonDetails pokemon={pokemon} />
    </div>
  );
};

const Pokemon = ({ pokemon }) => {
  const [pageStart, setPageStart] = useState(0);

  const page = [];
  const pageSize = 52;
  for (
    let index = pageStart;
    index < Math.min(pageStart + pageSize, pokemon.length - 1);
    index++
  ) {
    page.push(<PokemonCard key={index} pokemon={pokemon[index]} />);
  }

  console.log(
    pageStart,
    pokemon.length,
    Math.min(pageStart + pageSize + 1, pokemon.length - pageStart),
  );

  return (
    <main className="flex">
      <div className="flex main">
        {page}
      </div>
      <div className="flex controls">
        <button
          type="button"
          onClick={() => setPageStart(Math.max(0, pageStart - pageSize - 1))}
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={() =>
            setPageStart(
              Math.min(pageStart + pageSize + 1, pokemon.length - pageStart),
            )}
        >
          &gt;
        </button>
      </div>
    </main>
  );
};

export default Pokemon;
