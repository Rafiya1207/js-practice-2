const encoder = new TextEncoder();
const decoder = new TextDecoder();

const conn = await Deno.connect({
  // hostname: "10.132.126.232",
  hostname: "127.0.0.1",
  port: 8000,
  transport: "tcp",
});

let input = prompt("<<");

while (input !== "q") {
  await conn.write(
    encoder.encode(JSON.stringify({ message: input, closed: false })),
  );

  const buffer = new Uint8Array(1024);

  const n = await conn.read(buffer);

  const response = JSON.parse(decoder.decode(buffer.slice(0, n)));

  console.log(">> " + response.message);

  input = prompt("<<");
}

await conn.write(
  encoder.encode(JSON.stringify({ message: "q", closed: true })),
);
