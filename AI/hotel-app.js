const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const MODEL = "functiongemma:latest";
let token = "";

const searchHotel = async (city) => {
  const url = `http://localhost:3000/api/search/hotels?city=${city}`;
  const options = { method: "get" };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error(error);
  }
};

const bookHotel = async (hotelId, rooms, token) => {
  const url = "http://localhost:3000/api/bookings";
  const options = {
    method: "post",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ hotelId, rooms: parseInt(rooms) }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error(error);
  }
};

const listBookings = async (token) => {
  const url = "http://localhost:3000/api/bookings";
  const options = {
    method: "get",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const signUp = async (username, password) => {
  const url = "http://localhost:3000/api/users/register";
  const options = {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, password }),
  };

  try {
    await fetch(url, options);
    return JSON.stringify({ username, password });
  } catch (error) {
    console.error(error);
  }
};

const logIn = async (username, password) => {
  const url = "http://localhost:3000/api/users/login";
  const options = {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  try {
    const response = await fetch(url, options);
    console.log(response);
    
    const data = await response.json();
    token = data.bearerToken;
    return JSON.stringify(data);
  } catch (error) {
    console.error(error);
  }
};

const tools = [{
  type: "function",
  function: {
    name: "search_hotel",
    description: "Get a list of hotels",
    parameters: {
      type: "object",
      properties: {
        city: {
          type: "string",
          description: "the name of the city the hotel in",
        },
      },
      required: ["city"],
    },
  },
}, {
  type: "function",
  function: {
    name: "sign_up",
    description: "Sign up a user to an account with username, password",
    parameters: {
      type: "object",
      properties: {
        username: { type: "string", description: "username of the user" },
        password: { type: "string", description: "password of the user" },
      },
      required: ["username", "password"],
    },
  },
}, {
  type: "function",
  function: {
    name: "login",
    description: "Login the user with username, password",
    parameters: {
      type: "object",
      properties: {
        username: { type: "string", description: "username of the user" },
        password: { type: "string", description: "password of the user" },
      },
      required: ["username", "password"],
    },
  },
}, {
  type: "function",
  function: {
    name: "book_hotel",
    description: "Book a hotel for the user with hotelId and rooms",
    parameters: {
      type: "object",
      properties: {
        hotelId: { type: "string", description: "id of the hotel" },
        rooms: { type: "int", description: "number of rooms to book" },
      },
      required: ["hotelId", "rooms"],
    },
  },
}
];

async function chat(messages) {
  const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, messages, tools, stream: false }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

const toolsFns = {
  "search_hotel": (args) => searchHotel(args.city || "Mumbai"),
  "sign_up": (args) => signUp(args.username, args.password),
  login: (args) => logIn(args.username, args.password),
  "book_hotel": (args) => bookHotel(args.hotelId, args.rooms, token)
};

async function main() {
  const messages = [];

  while (true) {
    const message = prompt(">>> ");
    messages.push({ role: "user", content: message });

    const response = await chat(messages);

    if (response.message.tool_calls?.length) {
      const tool = response.message.tool_calls[0];

      const fn = toolsFns[tool.function.name];
      console.log(tool.function.arguments, tool.function.name);

      const result = await fn(tool.function.arguments);

      messages.push(response.message);
      messages.push({ role: "tool", content: result });

      const final = await chat(messages);
      console.log("Response:", final.message.content);
    } else {
      console.log("Response:", response.message.content);
    }
  }
}

main().catch(console.error);
