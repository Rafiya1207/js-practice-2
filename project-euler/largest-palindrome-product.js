const isPalindromeNumber = (number) =>
  number.toString().split("").reverse().join("") === number.toString();

const getPalindromeProducts = function* ([start, end]) {
  for (let i = start; i <= end; i++) {
    for (let j = start + 1; j <= end; j++) {
      if (isPalindromeNumber(i * j)) {
        yield i * j;
      }
    }
  }
};

const palindromeProducts = getPalindromeProducts([100, 999]);

console.log(Math.max(...palindromeProducts));
