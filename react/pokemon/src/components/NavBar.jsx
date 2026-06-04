import "../styles/Style.css";
import "../styles/Colors.css";
import { useState } from "react";

const Link = ({ filterPokemon, type, activeType, setActiveType }) => {
  const className = type === activeType
    ? `white-font ${type.toLowerCase()}`
    : "grey-font";
  return (
    <li
      className={`link ${className}`}
      onClick={() => {
        filterPokemon(type);
        setActiveType(type);
      }}
    >
      {type}
    </li>
  );
};

const Navbar = ({ filterPokemon, activeType, setActiveType }) => {
  const types = [
    "All",
    "Bug",
    "Dark",
    "Dragon",
    "Electric",
    "Fairy",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Steel",
    "Water",
  ];

  return (
    <div className="side-bar">
      <ul>
        {types.map((type, idx) => (
          <Link
            key={idx}
            filterPokemon={filterPokemon}
            activeType={activeType}
            type={type}
            setActiveType={setActiveType}
          />
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
