import "./authentication.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FormErrorsType, ReactChangeEvent, ReactMouseEvent, LocationState } from "../../types";
import { Input, Loading, Navbar, OverlayContainer } from "../../components";
import { PasswordInput } from "../../components/input/PasswordInput";
import { validFormChecker } from "./utils";
import { useAuth } from "../../hooks";

const Signup = () => {
  const [formErrors, setFormErrors] = useState({} as FormErrorsType);
  const [submitted, setSubmitted] = useState(false);
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreement: "not agree",
  });

  const {
    signUp,
    authState: { isLoading, error },
  } = useAuth();

  const location = useLocation();

  const { from } = (location.state as LocationState) || { from: { pathname: "/" } };

  const changeHandler = (e: ReactChangeEvent) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const formSubmitHandler = (e: ReactMouseEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const { firstName, lastName, email, password } = userInput;
    if (!(Object.values(formErrors).length > 0)) {
      signUp({ firstName, lastName, email, password }, from);
      setFormErrors({});
    }
  };

  useEffect(() => {
    setFormErrors(() => validFormChecker(userInput));
  }, [userInput, submitted]);

  return (
    <div className="form-wrapper">
      <Navbar />

      <div className="form-container flex-total-center">
        <form className="form-grp">
          <h2 className="text-center text-lg">Signup</h2>

          {error && <p className="text-danger text-center">{error}</p>}

          <OverlayContainer display={isLoading}>
            <Loading />
          </OverlayContainer>
          <Input
            type="text"
            defaultValue={userInput.firstName}
            name="firstName"
            label="Name"
            helperText={formErrors.firstName}
            showError={submitted}
            required={true}
            changeHandler={changeHandler}
          />
          <Input
            type="text"
            defaultValue={userInput.lastName}
            name="lastName"
            label="Lastname"
            helperText={formErrors.lastName}
            showError={submitted}
            required={true}
            changeHandler={changeHandler}
          />
          <Input
            type="email"
            defaultValue={userInput.email}
            name="email"
            label="Email"
            helperText={formErrors.email}
            showError={submitted}
            required={true}
            changeHandler={changeHandler}
          />
          <PasswordInput
            defaultValue={userInput.password}
            name="password"
            label="Password"
            helperText={formErrors.password}
            showError={userInput.password.length > 2 || submitted}
            required={true}
            changeHandler={changeHandler}
          />

          <Input
            type="password"
            defaultValue={userInput.confirmPassword}
            name="confirmPassword"
            label="Confirm Password"
            helperText={formErrors.confirmPassword}
            showError={userInput.confirmPassword.length > 2 || submitted}
            required={true}
            changeHandler={changeHandler}
          />

          <div className="options">
            <label htmlFor="agreement">
              <input
                type="checkbox"
                name="agreement"
                onChange={changeHandler}
                value={userInput.agreement === "agree" ? "not agree" : "agree"}
                checked={userInput.agreement === "agree"}
                id="agreement"
              />
              I agree to all Terms & Conditions
            </label>

            {submitted && (
              <p className="text-danger text-xs text-center option-helper-txt">
                {formErrors.agreement}
              </p>
            )}
          </div>

          <button className="btn btn-primary btn-submit" onClick={e => formSubmitHandler(e)}>
            Create new account
          </button>

          <div className="redirect-link text-center">
            <Link className="link-btn flex-total-center" to="/sign-in">
              Already have an account<i className="fas fa-chevron-right"></i>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Signup };
