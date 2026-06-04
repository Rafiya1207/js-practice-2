const getPixelsAddress = (index) => {
  const leftHalf = parseInt(index.toString(2).padStart(8, "0").slice(0, 4), 2);
  const rightHalf = parseInt(index.toString(2).padStart(8, "0").slice(4), 2);

  return [leftHalf, rightHalf];
};

const composePixel = (pixelData, index) => ({
  r: pixelData[index],
  g: pixelData[index + 1],
  b: pixelData[index + 2],
});

const getColor = (pixel) =>
  `\x1b[48;2;${pixel.r};${pixel.g};${pixel.b}m  \x1b[0m`;

const getColorsFromAddress = (pixelsData, address) => {
  const [leftHalf, rightHalf] = getPixelsAddress(address);

  const pixel1 = composePixel(pixelsData, leftHalf);
  const pixel2 = composePixel(pixelsData, rightHalf);

  return [getColor(pixel1), getColor(pixel2)];
};

const extractPixels = (pixelData) =>
  pixelData.flatMap((address) => getColorsFromAddress(pixelData, address));

const main = async () => {
  const bytes = (await Deno.readTextFile("./ditto_image_response.txt"))
    .split(",").map((x) => parseInt(x));

  const signature = bytes.slice(0, 9);
  const chunkLength = bytes[12];
  const width = bytes[19];
  const height = bytes[23];
  const bitDepth = bytes[24]; // 4
  const colorType = bytes[25]; // 3
  const paletteLength = bytes[36];
  const paletteData = bytes.slice(41, 41 + paletteLength);
  // transperancy
  const pixelDataLength = bytes[85];
  const pixelData = bytes.slice(90, 90 + pixelDataLength);

  const pixels = extractPixels(pixelData);

  const colors = [];
  let start = 0;

  // console.log(pixels.join(''));
  

  console.log(bytes);
  
  for (let row = 0; row < height; row++) {
    // console.log(start);
    colors.push(pixels.slice(start, start + width));
    start = start + width;
  }

  // console.log(colors.join(''));

  // displayColor(color1);
  // displayColor(color2);
};
main();
