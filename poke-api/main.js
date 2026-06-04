import { createRequestHandler } from "./src/request_handler.js";

const decode = (data) => new TextDecoder().decode(data);
const encode = (data) => new TextEncoder().encode(data);

const main = () => {
  const readFileFrom = async (path) => {
    const file = await Deno.open(path, { read: true });
    const contentLength = await file.stat().then(({ size }) => size);
    const buffer = new Uint8Array(contentLength);
    await file.read(buffer);
    file.close();
    return decode(buffer);
  };
  const writeTo = async (path, data) => {
    const file = await Deno.open(path, { write: true, create: true });
    file.write(encode(data));
    file.close();
  };
  const appendTo = async (path, data) => {
    const file = await Deno.open(path, { append: true, create: true });
    file.write(encode(data));
    file.close();
  };
  const requestHandler = createRequestHandler(writeTo, readFileFrom, appendTo);

  Deno.serve({ port: 3000 }, requestHandler);
};

main();
