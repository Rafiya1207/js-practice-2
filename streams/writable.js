const encoder = new TextEncoder();
const data = encoder.encode("Hello world");
const writer = await Deno.stdout.writable;

console.log(writer);

const writableStream = new WritableStream();
