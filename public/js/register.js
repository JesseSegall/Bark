const form = document.getElementById("form");
const user_name = document.getElementById("user_name");
const email = document.getElementById("email");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const password = document.getElementById("password");
const password_confm = document.getElementById("password_confm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

const setErrors = (element, message) => {
  const formControl = element.parentElement;
  const errorDisplay = formControl.querySelector(".error");

  errorDisplay.innerText = message;
  formControl.classList.add("error");
  formControl.classList.remove("success");
};

const setSuccess = (element) => {
  const formControl = element.parentElement;
  const errorDisplay = formControl.querySelector(".error");

  errorDisplay.innerText = "";
  formControl.classList.add("success");
  formControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(String(email).toLowerCase());
};

const isValidPassword = (password) => {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return strongRegex.test(password);
};

const validateInputs = () => {
  const user_nameVal = user_name.value.trim();
  const emailVal = email.value.trim();
  const first_nameVal = first_name.value.trim();
  const last_nameVal = last_name.value.trim();
  const passwordVal = password.value.trim();
  const password_confmVal = password_confm.value.trim();

  if (user_nameVal === "") {
    setErrors(user_name, "A username is required.");
  } else {
    setSuccess(user_name);
  }

  if (emailVal === "") {
    setErrors(email, "Please enter a valid email address.");
  } else if (!isValidEmail(emailVal)) {
    setErrors(email, "A valid email address is required.");
  } else {
    setSuccess(email);
  }

  if (first_nameVal === "") {
    setErrors(first_nameVal, "Please enter your first name.");
  } else {
    setSuccess(first_name);
  }

  if (last_nameVal === "") {
    setErrors(last_name, "Please enter your last name.");
  } else {
    setSuccess(last_name);
  }

  if (passwordVal === "") {
  } else if (!isValidPassword(passwordVal)) {
    setErrors(
      password,
      "Password must be atleast 8 characters long and contain 1 uppercase letter, 1 lowercase letter , 1 number , and one special character (!,@,#,$,%,^,&,*)"
    );
  } else {
    setSuccess(password);
  }

  if (password_confmVal === "") {
    setErrors(password_confm, "");
  } else if (passwordVal !== password_confmVal) {
    setErrors(password_confm, "Passwords do not match.");
  } else if (!isValidPassword(password_confmVal)) {
    setErrors(
      password,
      "Password must be atleast 8 characters long and contain 1 uppercase letter, 1 lowercase letter , 1 number , and one special character (!,@,#,$,%,^,&,*)"
    );
  } else {
    setSuccess(password_confm);
  }
};
