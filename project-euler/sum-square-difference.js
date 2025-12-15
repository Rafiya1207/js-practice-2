const sumOfSquaresOf = (range) => {
  let sumOfSquares = 0;

  for (let number = 1; number <= range; number++) {
    sumOfSquares += Math.pow(number, 2);
  }
  return sumOfSquares;
};

const squareOfSum = (range) => {
  let sum = 0;

  for (let number = 1; number <= range; number++) {
    sum += number;
  }
  return Math.pow(sum, 2);
};

const difference = (range) => squareOfSum(range) - sumOfSquaresOf(range);

console.log(difference(100));
