import { logRequest, notFoundPage, serveHomepage, serveHouse } from "./controllers.js";

export const requestHandler = (req) => {
  const url = new URL(req.url);
  req.pathname = url.pathname;

  logRequest(req);

  if (url.pathname === "/" && req.method === "GET") {
    return serveHomepage(req);
  }

  if (url.pathname === "/house" && req.method === "POST") {
    return serveHouse(req);
  }

  return notFoundPage(req);
};
