const isPrime = (number) => {
	if (number === 1) return false;
	if (number === 2) return true; 
	for (let factor = 2; factor <= Math.sqrt(number); factor++) {
		if(number % factor === 0) return false;
	}
	return true;
}
const findLargestPrimeFactor = (number) => {
let largestPrimeFactor = number;	
for (let factor = 2; factor <= Math.sqrt(number); factor++){
if(number % factor === 0 && isPrime(factor)) {
			largestPrimeFactor = factor;
		}
	}
return largestPrimeFactor;
}

console.log(findLargestPrimeFactor(600851475143)); 
