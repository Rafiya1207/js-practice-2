import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import pokemon from "./pokemon.json";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App pokemon={pokemon}/>
  </StrictMode>,
);
