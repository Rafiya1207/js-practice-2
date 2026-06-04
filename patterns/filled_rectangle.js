#! /usr/local/bin/deno ./patterns/filled_rectangle.js
console.log(Deno.args);
const generateRows = (rows, columns) => {
  const array = [];
  for (let row = 0; row < rows; row++) {
    array.push(columns);
  }
  return array;
};

const mapChars = (array, char) => array.map((cls) => char.repeat(cls));

  mapChars(generateRows(rows, columns), "*").join("\n");

console.log(filled_rectangle(4, 4));
