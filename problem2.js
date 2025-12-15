const fibonacci = (end) => {
	let firstTerm = 0;
	let secondTerm = 1;
	let thirdTerm = firstTerm + secondTerm;
	while(thirdTerm <= 10) {
		console.log(thirdTerm);
		firstTerm = secondTerm;
		secondTerm = thirdTerm;
		thirdTerm = firstTerm + secondTerm;
	}
}

fibonacci();
