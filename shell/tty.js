// const tty00 = await Deno.open("/dev/ttys000", { write: true, read: true });

// const writer = tty00.writable.getWriter();

// for await (const item of tty9.readable) {
//   await writer.write(item);
// }

// const file = await Deno.open("pokemon-names.txt");
// const tty3 = await Deno.open("/dev/ttys003", { write: true, read: true });

// tty3.setRaw(true);

// const stats = await tty3.stat();
// const tty3Size = stats.size;
// const tty3Buffer = new Uint8Array(tty3Size);
// const pokemonBuffer = new Uint8Array(50);

// await file.read(pokemonBuffer);
// await tty3.write(pokemonBuffer);
// prompt();
// await tty3.read(tty3Buffer);

// console.log(new TextEncoder().encode(tty3Buffer));

// for await (const key of tty3.readable) {
//   if (key[0] === 97) {
//     Deno.exit(55);
//   }
// }

const list = ["one", "two"];

const addColor = (text) => `\x1b[31m${text}\x1b[0m`;

let currentIndex = 0;

const tty3 = await Deno.open("/dev/ttys003", { read: true, write: true });

for await (const chunk of tty3.readable) {
  await scriptWriter.write(chunk);
  if (chunk[0] === 113) {
    Deno.exit(80);
  }
}

  const currentItem = list[currentIndex % list.length];
  // if () {
    
  // }
  list[currentIndex % list.length] = addColor(currentItem);

const tty14 = await Deno.open("/dev/ttys014", { read: true, write: true });
// const tty14Writer = tty14.writable.getWriter();
const script = await Deno.open("script.sh", { append: true });
const scriptWriter = script.writable.getWriter();
await tty3.writable.getWriter().write(
  new TextEncoder().encode("one\ntwo\nthree"),
);

tty3.setRaw(true);


