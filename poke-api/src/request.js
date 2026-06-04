const pokemon = {
  name: "charmander",
  id: 4,
};

const addPokemon = async (pokemon) => {
  const request = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(pokemon),
  };
  const response = await fetch("http://0.0.0.0:3000/pokemon", request);
  const responseText = await response.text();
  console.log(`${responseText} added`);
};

const getPokemons = async () => {
  const request = {
    method: "GET",
  };
  const response = await fetch("http://0.0.0.0:3000/pokemon", request);
  const responseText = await response.text();
  const pokemon = responseText;
  console.table(responseText);
};

const getPokemon = async (pokemon) => {
  const request = {
    method: "GET",
  };
  const response = await fetch(
    `http://0.0.0.0:3000/pokemon/${pokemon}`,
    request,
  );
  const responseText = await response.text();
  console.table(responseText);
};

await addPokemon(pokemon);
await getPokemon("bulabsaur");
