import { useState } from "react";
import Navbar from "./components/NavBar.jsx";
import Pokemon from "./components/Pokemon.jsx";
import Slideshow from "./components/Slideshow.jsx";
import Searchbar from "./components/SearchBar.jsx";

function App({ pokemon: p }) {
  const [pokemon, setPokemon] = useState(p);
  const [activeType, setActiveType] = useState("All");

  const filterPokemon = (type, keyword = "") =>
    setPokemon(
      p.filter(({ types, name }) =>
        (type === "All" ? true : types.includes(type.toLowerCase())) &&
        name.startsWith(keyword)
      ),
    );

  return (
    <>
      <Navbar
        filterPokemon={filterPokemon}
        activeType={activeType}
        setActiveType={setActiveType}
      />
      <Searchbar filterPokemon={filterPokemon} activeType={activeType} />
      <Pokemon pokemon={pokemon} setPokemon={setPokemon}/>
    </>
  );
}

export default App;
