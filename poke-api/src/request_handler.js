const createResponse = (data, status, contentType) => {
  return new Response(data, {
    status,
    headers: { "content-type": contentType },
  });
};

export const createRequestHandler = (writeTo, appendTo, readFileFrom) => (request) =>
  handleRequest(request, writeTo, appendTo, readFileFrom);

export const handleRequest = async (
  request,
  writeTo,
  readFileFrom,
  appendTo,
) => {
  console.log(`${request.method} ${request.url}`);

  const url = new URL(request.url);

  if (url.pathname === "/pokemon" && request.method === "POST") {
    return await postPokemon(request, writeTo, appendTo);
  }
  
  if (url.pathname === "/pokemon" && request.method === "GET") {
    return await getPokemons(readFileFrom);
  }

  const getEndPoint = /^\/pokemon\/\w+$/;

  if (getEndPoint.test(url.pathname) && request.method === "GET") {
    return await getPokemon(url, readFileFrom);
  }

  return createResponse("NOT FOUND", 404, "text/plain");
};

async function getPokemon(url, readFileFrom) {
  const fileName = url.pathname.split("/").pop();
  const data = await readFileFrom(`./data/${fileName}.json`);

  return createResponse(data, 200, "application/json");
}

async function getPokemons(readFileFrom) {
  const data = await readFileFrom(`./data/pokemon.txt`);

  return createResponse(data, 200, "application/json");
}

async function postPokemon(request, writeTo, appendTo) {
  const data = await request.json();
  const fileName = data.name;

  writeTo(`./data/${fileName}.json`, JSON.stringify(data));
  appendTo(`./data/pokemon.txt`, JSON.stringify(data));
  return createResponse(fileName, 201, "text/plain");
}
