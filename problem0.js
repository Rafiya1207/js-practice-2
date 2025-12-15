const oddSquaresSum = (start, end) => {
  let sum = 0;
  for (let number = start; number <= end; number += 2) {
    sum += number * number;
  }
  return sum;
};

console.log(oddSquaresSum(1, 170000));
