const form = document.getElementById('form');
const user_name = document.getElementById('user_name');
const email = document.getElementById('email');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const password = document.getElementById('password');
const password_confm = document.getElementById('password_confm');
const small = document.getElementById('small_dog');
const medium = document.getElementById('medium_dog');
const large = document.getElementById('large_dog');
const difficultDog = document.getElementById('difficult_dog');
const genderVal = document.getElementById('genderVal');
let flag = false;
form.addEventListener('submit', (e) => {
	validateInputs();
	if (flag === true) {
		e.preventDefault();
	}
});

const setErrors = (element, message) => {
	const formControl = element.parentElement;
	const errorDisplay = formControl.querySelector('.error');

	errorDisplay.innerText = message;
	formControl.classList.add('error');
	formControl.classList.remove('success');
};

const setSuccess = (element) => {
	const formControl = element.parentElement;
	const errorDisplay = formControl.querySelector('.error');

	errorDisplay.innerText = '';
	formControl.classList.add('success');
	formControl.classList.remove('error');
};

const isValidEmail = (email) => {
	const regEx =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regEx.test(String(email).toLowerCase());
};

const isValidPassword = (password) => {
	const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
	return strongRegex.test(password);
};
//TODO: Need to add error checking for checkboxes. At least one must be checked
const validateInputs = () => {
	const user_nameVal = user_name.value.trim();
	const emailVal = email.value.trim();
	const first_nameVal = first_name.value.trim();
	const last_nameVal = last_name.value.trim();
	const passwordVal = password.value.trim();
	const password_confmVal = password_confm.value.trim();
	const genderVal = genderVal.value.trim();

	if (user_nameVal === '') {
		setErrors(user_name, 'A username is required.');
		flag = true;
	} else {
		setSuccess(user_name);
		flag = false;
	}

	if (emailVal === '') {
		setErrors(email, 'Please enter a valid email address.');
		flag = true;
	} else if (!isValidEmail(emailVal)) {
		setErrors(email, 'A valid email address is required.');
		flag = true;
	} else {
		setSuccess(email);
		flag = false;
	}

	if (first_nameVal === '') {
		setErrors(first_nameVal, 'Please enter your first name.');
		flag = true;
	} else {
		setSuccess(first_name);
		flag = false;
	}

	if (last_nameVal === '') {
		setErrors(last_name, 'Please enter your last name.');
		flag = true;
	} else {
		setSuccess(last_name);
		flag = false;
	}

	if (passwordVal === '') {
	} else if (!isValidPassword(passwordVal)) {
		setErrors(
			password,
			'Password must be atleast 8 characters long and contain 1 uppercase letter, 1 lowercase letter , 1 number , and one special character (!,@,#,$,%,^,&,*)'
		);
		flag = true;
	} else {
		setSuccess(password);
		flag = false;
	}

	if (password_confmVal === '') {
		setErrors(password_confm, '');
		flag = true;
	} else if (passwordVal !== password_confmVal) {
		setErrors(password_confm, 'Passwords do not match.');
		flag = true;
	} else if (!isValidPassword(password_confmVal)) {
		setErrors(
			password,
			'Password must be atleast 8 characters long and contain 1 uppercase letter, 1 lowercase letter , 1 number , and one special character (!,@,#,$,%,^,&,*)'
		);
		flag = true;
	} else {
		setSuccess(password_confm);
		flag = false;
	}

	if (genderVal) {
		if (genderVal === '' || typeof genderVal == 'number') {
			setErrors(genderVal, 'Please enter a gender.');
			flag = true;
		} else {
			setSuccess(genderVal);
			flag = false;
		}
	}
};
