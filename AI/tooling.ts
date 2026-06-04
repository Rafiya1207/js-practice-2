/**
 * Single tool, single turn example.
 * Run with: bun run tool.ts or npx tsx tool.ts
 */

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const MODEL = 'pokemon-1:latest';

function getWeather(city: string): string {
  return JSON.stringify({ city, temperature: 22, unit: 'celsius', condition: 'sunny' });
}

function listFiles(directory: string): string {
  return JSON.stringify(["a.txt","b.txt"]);
}

async function getPokemon(id: string): Promise<string> {
  return await fetch(`http://pokeapi.co/api/v2/pokemon/${id}`).then(x=>x.json()).then(x=>x.name);
}

const tools = [
  {
    type: 'function',
    function: {
      name: 'get_weather',
      description: 'Get the current weather for a city.',
      parameters: {
        type: 'object',
        properties: {
          city: { type: 'string', description: 'The name of the city' },
        },
        required: ['city'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_files',
      description: 'Get the list of files in a specific directory',
      parameters: {
        type: 'object',
        properties: {
          directory: { type: 'string', description: 'The name of a directory' },
        },
        required: ['directory'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_pokemon',
      description: 'Get a pokemon based on the id',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'The id of a pokemon' },
        },
        required: ['id'],
      },
    },
  },
];

const toolsFns : Record<string,(x:string)=>string|Promise<string>>  = {
  'get_weather': getWeather,
  'list_files': listFiles,
  'get_pokemon': getPokemon
};

interface Message {
  role: string;
  content: string;
  tool_calls?: { function: { name: string; arguments: Record<string, string> } }[];
}

interface ChatResponse {
  message: Message;
}

async function chat(messages: Message[]): Promise<ChatResponse> {
  const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages, tools, stream: false }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function main() {
  const messages: Message[] = [];
  
  const message  = "What is the pokemon with id 1"
  messages.push({role:'user',content:message!});

  const response = await chat(messages);

  if (response.message.tool_calls?.length) {
    const tool = response.message.tool_calls[0];
    console.log(`Calling: ${tool.function.name}(${JSON.stringify(tool.function.arguments)})\n`);

    const fn = toolsFns[tool.function.name];
    const args = tool.function.arguments;
    const result = await fn(args.directory || args.city || args.id);
    console.log('Function Result:', result);

    messages.push(response.message);
    messages.push({ role: 'tool', content: result });

    const final = await chat(messages);
    console.log('Response:', final.message.content);
  } else {
    console.log('Response:', response.message.content);
  }
}

main().catch(console.error);
