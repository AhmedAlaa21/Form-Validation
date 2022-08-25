const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const psw = document.getElementById("psw");
const confirmPsw = document.getElementById("password2");


//#region - Methods

function showError(input, errorMessage, i) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = document.querySelectorAll("small");
  let index = i
  for (; index < small.length; index++) {
    small[index].innerText = errorMessage;
  }
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkRequired(inputArr) {
  i = 0;
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`, i);
    } else {
      showSuccess(input);
    }
    i++

  });
}

function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} should be between ${min} - ${max} characters`
    );
  } else {
    showSuccess;
  }
}

// Check email is valid
function checkEmail(input) {
  //taken from Stack over flow..
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //end taken from Stack over flow.

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value != input2.value) {
    showError(input2, "Password does not match");
  } else {
    showSuccess(input2);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// event listeners
//#endregion
form.addEventListener("submit", function (event) {
  event.preventDefault();
  checkRequired([username, email, psw, confirmPsw]);
  checkLength(username, 3, 15);
  checkLength(psw, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(psw, confirmPsw);
});
