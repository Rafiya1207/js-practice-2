const gcdOf = (a, b) => b === 0 ? a : gcdOf(b, a % b);

const smallestMultipleIn = (range) => {
  let lcm = 1;
  for (let number = 1; number <= range; number++) {
    lcm = (lcm * number) / gcdOf(lcm, number);
  }
  return lcm;
};

console.log(smallestMultipleIn(20));
