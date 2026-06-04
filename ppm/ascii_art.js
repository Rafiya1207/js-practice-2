export const asciiArt = async (image, density) => {
  const { pixels, width, height, pixelLength } = image;
  let pixelIndex = 0;

  const writer = Deno.stdout.writable.getWriter();
  const encoder = new TextEncoder();

  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      const r = pixels[pixelIndex];
      const g = pixels[pixelIndex + 1];
      const b = pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      const charIndex = Math.floor(
        (Math.min(255, avg * 1.1) / 255) * (density.length - 1),
      );

      const position = `\x1b[${x + 1};${y + 1}H`;

      const char = density[charIndex];
      const color = `\u001b[38;2;${r};${g};${b}m${char}`;

      await writer.write(encoder.encode(position));
      await writer.write(encoder.encode(color));

      pixelIndex += pixelLength;
    }
  }
};
