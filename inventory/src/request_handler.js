const createResponse = (data, statusCode, contentType) => {
  return new Response(data, {
    "status": statusCode,
    headers: { "content-type": contentType },
  });
};

export const createRequestHandler = (fs, fns, inventory) => (request) =>
  handleRequest(request, fs, fns, inventory);

export const handleRequest = (request, fs, fns, inventory) => {
  console.log(`${request.method} ${request.url}`);

  const url = new URL(request.url);

  if (url.pathname === "/") {
    const listOfInventory = fns.listInventory(inventory);
    return createResponse(
      JSON.stringify(listOfInventory),
      200,
      "application/json",
    );
  }

  const data = fs("./pages/not-found.html");
  return createResponse(data, 404, "text/html");
};
