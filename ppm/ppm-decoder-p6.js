import { asciiArt } from "./ascii_art.js";
import { ppmDecoderP3 } from "./ppm-parser-p3.js";

const charOf = (code) => String.fromCharCode(code);

const ppmDecoder = async (image) => {
  const data = await Deno.readFile(image);

  const magicNumber = charOf(data[0]) + charOf(data[1]);

  const secondNextLine = data.indexOf(10, 3);
  const [width, height] = parseWidthAndHeight(data, secondNextLine);
  const thirdNextLine = data.indexOf(10, secondNextLine + 1);

  const pixels = data.slice(thirdNextLine + 1);

  return {
    pixels,
    width,
    height,
    pixelLength: 3,
  };
};

function parseWidthAndHeight(data, secondNextLine) {
  return data
    .slice(3, secondNextLine)
    .toString()
    .split(",32,")
    .map((e) =>
      parseInt(
        e
          .split(",")
          .reduce((res, char) => res += charOf(char), ""),
      )
    );
}

const image1 = await ppmDecoder("./assets/pokemon.ppm");
const densityLowToHigh = ".':!+io?!CO1234567890Q@#";
// const densityLowToHigh = '  .⁃*!•✺';
const blocky = "  ░▒▓█";

// const image2 = await ppmDecoderP3("./assets/pokemon_battle_70.ppm");

await asciiArt(image1, densityLowToHigh.split("").reverse().join(""));
// await asciiArt(image2, densityLowToHigh);
