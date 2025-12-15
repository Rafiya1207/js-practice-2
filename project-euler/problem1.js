const sumOfMultiplesOf3or5 = (start, end) => {
	let sum = 0;
		
	for (let number = start; number < end; number++) {
		if (number % 3 === 0 || number % 5 === 0) {
			sum += number;
		}
	}
	return sum;
}
	
console.log(sumOfMultiplesOf3or5(1, 1000));
