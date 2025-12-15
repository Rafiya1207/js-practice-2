const isPrime = (number) => {
  if (number <= 1) return false;
  for (let factor = 2; factor <= Math.sqrt(number); factor++) {
    if (number % factor === 0) return false;
  }
  return true;
};

const primeAt = (position) => {
  let number = 1;
  let currentPosition = 0;
  while (currentPosition !== position) {
    number++;
    if (isPrime(number)) currentPosition++;
  }
  return number;
};
