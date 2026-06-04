const decoder = new TextDecoder();
const encoder = new TextEncoder();

const listener = Deno.listen({
  hostname: "127.0.0.1",
  port: 8000,
  transport: "tcp",
});

const readRequest = async (conn) => {
  const buffer = new Uint8Array(100);
  const bytes = await conn.read(buffer);
  const data = decoder.decode(buffer.slice(0, bytes));

  const request = data.split("\r\n\r\n");
  const [requestLine, ...requestHeaders] = request[0].split("\r\n");
  const [method, path, protocol] = requestLine.split(" ");
  const requestBody = request[1];

  return { method, path, protocol, requestHeaders, requestBody };
};

const createHeaders = (headers) =>
  Object.entries(headers)
    .map(([name, value]) => `${name}: ${value}`)
    .join("\r\n");

const createSuccessResponse = async (data) => {
  const protocol = "HTTP/1.1";
  const statusCode = "200";
  const status = "OK";
  // const data = Deno.readTextFileSync("./sample.html");

  const responseLine = `${protocol} ${statusCode} ${status}`;

  const responseHeaders = {
    "Content-Type": "text/html",
    "Content-Length": data.length,
  };

  return [responseLine, createHeaders(responseHeaders), "", data]
    .join("\r\n");
};

for await (const conn of listener) {
  const { method, path, protocol } = await readRequest(conn);
  writeResponse(conn);
}
