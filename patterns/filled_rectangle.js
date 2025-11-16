const generateRows = (rows, columns) => {
  const array = [];
  for (let row = 0; row < rows; row++) {
    array.push(columns);
  }
  return array;
};

const mapChars = (array, char) => array.map((cls) => char.repeat(cls));

const filled_rectangle = (rows, columns) =>
  mapChars(generateRows(rows, columns), "*").join("\n");

console.log(filled_rectangle(4, 4));
