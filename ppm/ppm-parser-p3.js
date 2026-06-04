export const ppmDecoderP3 = (path) => {
  const image = Deno.readTextFileSync(path);

  const lines = image.split("\n");

  const headers = lines.slice(0, 4);
  const [width, height] = headers[2].split(" ");

  const pixels = lines.slice(4)
    .flatMap((line) =>
      line.split(" ")
        .flatMap((pixel) => parseInt(pixel))
        .filter((x) => !isNaN(x))
    );

  return { pixels, width, height, pixelLength: 3 };
};
