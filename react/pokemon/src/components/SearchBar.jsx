import { useState } from "react";
import "../styles/Style.css";

const Searchbar = ({ filterPokemon, activeType }) => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search By Name..."
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            filterPokemon(activeType, keyword);
            return;
          }
          setKeyword(e.target.value);
        }}
      />
    </div>
  );
};

export default Searchbar;
