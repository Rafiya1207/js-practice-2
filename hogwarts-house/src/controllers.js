import {
  addUser,
  addVote,
  calculatePercentage,
  getHouses,
  getUsers,
} from "./services.js";

export const logRequest = (req) => {
  console.log(`${req.method} ${req.pathname}`);
};

const parseCookie = (req) => {
  const cookies = req.headers.get("cookie") || "";
  return Object.fromEntries(
    cookies.split(";")
      .map((cookie) => cookie.trim().split("=")),
  );
};

export const serveHomepage = async (req) => {
  const homepage = await Deno.readTextFile("./public/html/index.html");
  const cookie = parseCookie(req);

  const users = await getUsers();

  if (users.includes(cookie["username"])) {
    const houses = await getHouses();

    return new Response(JSON.stringify(houses), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response(homepage, {
    headers: {
      "content-type": "text/html",
    },
  });
};

export const serveHouse = async (req) => {
  const formData = await req.formData();
  const username = formData.get("username");
  const house = formData.get("house");
  const houses = await readFile("./data/houses.json");
  const users = await readFile("./data/users.json");

  addVote(houses, house);
  addUser(users, username, house);

  const updatedHouses = calculatePercentage(houses);

  await writeToJson(updatedHouses, "./data/houses.json");
  await writeToJson(users, "./data/users.json");

  return new Response(JSON.stringify(updatedHouses), {
    headers: {
      "content-type": "application/json",
      "set-cookie": `username=${username}`,
    },
  });
};

export const notFoundPage = (_req) => {
  return new Response("<h1>NOT FOUND</h1>", {
    status: 404,
    headers: {
      "content-type": "text/html",
    },
  });
};

async function writeToJson(data, path) {
  const encoder = new TextEncoder();
  const jsonData = JSON.stringify(data);

  await Deno.writeFile(path, encoder.encode(jsonData));
}

export async function readFile(path) {
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(path);
  return JSON.parse(decoder.decode(data));
}
