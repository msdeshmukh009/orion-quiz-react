import { FormErrorsType, LogInUserInput, UserDetailType } from "../../types";

const mailFormat =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

type UserInputType = UserDetailType & LogInUserInput;

const validFormChecker = (userInput: UserInputType) => {
  const { firstName, lastName, email, password, confirmPassword, agreement } = userInput;
  const err = {} as FormErrorsType;
  if (!firstName) {
    err.firstName = "Enter valid name";
  }

  if (!lastName) {
    err.lastName = "Enter valid lastname";
  }

  if (!email.match(mailFormat)) {
    err.email = "Enter valid email";
  }

  if (!password) {
    err.password = "Enter valid password";
  } else if (!password.match(passwordFormat)) {
    err.password = "Too weak!!";
  }
  if (!confirmPassword) {
    err.confirmPassword = "Confirm the password";
  } else if (confirmPassword !== password) {
    err.confirmPassword = "Password should match";
  }

  if (agreement === "not agree") {
    err.agreement = "Please check this box if you want to proceed";
  }
  return err;
};
const validLoginFormChecker = (userInput: LogInUserInput) => {
  const { email, password } = userInput;
  const err = {} as FormErrorsType;

  if (!email.match(mailFormat)) {
    err.email = "Enter valid email";
  }

  if (!password) {
    err.password = "Enter valid password";
  }

  return err;
};

export { validFormChecker, validLoginFormChecker };
