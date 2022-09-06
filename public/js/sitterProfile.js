// TODO: Basically copy the error handling from register.js and make sure that email is valid, that they must enter something to submit a request etc

let flag = false;
form.addEventListener('submit', (e) => {
	validateInputs();
	if (flag === true) {
		e.preventDefault();
	}
});
