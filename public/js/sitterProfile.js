let flag = false;
form.addEventListener('submit', (e) => {
	validateInputs();
	if (flag === true) {
		e.preventDefault();
	}
});
