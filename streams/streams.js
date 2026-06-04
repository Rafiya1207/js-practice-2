const decoder = new TextDecoder();
const encoder = new TextEncoder();

const createTransformStream = (transform) =>
  new TransformStream({
    transform,
  });

const transformLines = (limit, iteration = 0) => (chunk, controller) => {
  const line = decoder.decode(chunk);
  const lines = line.split("\n").slice(0, limit).join("\n");

  controller.enqueue(encoder.encode(lines));

  if (++iteration >= limit) {
    controller.terminate();
  }
};

const transformBytes = (limit, line = "") => (chunk, controller) => {
  line += decoder.decode(chunk);

  if (line.length >= limit) {
    const firstChars = line.slice(0, limit);
    controller.enqueue(encoder.encode(firstChars));
    controller.terminate();
  }
};

const head = (readFrom, transformStream) => {
  readFrom.readable
    .pipeThrough(transformStream)
    .pipeTo(Deno.stdout.writable);
};

const transformers = {
  "-n": transformLines,
  "-c": transformBytes,
};

const option = "-c";
const limit = 10;

head(Deno.stdin, createTransformStream(transformers[option](limit)));

head(
  await Deno.open("./fakeTransformStream.js", { read: true }),
  createTransformStream(transformers[option](limit)),
);
