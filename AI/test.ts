import { ChatResponse, Message } from "./types";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const MODEL = "qwen3:4b";

function getWeather(city: string): string {
  return JSON.stringify({
    city,
    temperature: 22,
    unit: "celsius",
    condition: "sunny",
  });
}

async function chat(messages: Message[]): Promise<ChatResponse> {
  const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, messages, stream: false }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function main() {
  const messages: Message[] = [{
    role: "user",
    content: "Hello",
  }];
  console.log("Prompt:", messages[0].content);

  const response = await chat(messages);
  console.log(response.message.content);
  
}

main().catch(console.error);
