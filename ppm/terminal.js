const writer = Deno.stdout.writable.getWriter();
const encoder = new TextEncoder();

// const x = 20;
// const y = 30;

const pixels = [
  174,
  126,
  141,
  164,
  116,
  134,
  156,
  109,
  129,
  147,
  99,
  123,
];

// const r = 174;
// const g = 126;
// const b = 141;
let pixelIndex = 0;

for (let x = 0; x < 1; x++) {
  for (let y = 0; y < 4; y++) {
    const r = pixels[pixelIndex];
    const g = pixels[pixelIndex + 1];
    const b = pixels[pixelIndex + 2];

    const position = `\x1b[${x};${y}H`;
    const color = `\u001b[48;2;${r};${g};${b}m `;
    // console.log(x, y);
    // console.log(r, g, b);

    await writer.write(encoder.encode(position));
    await writer.write(encoder.encode(color));
    pixelIndex += 3;
  }
}
