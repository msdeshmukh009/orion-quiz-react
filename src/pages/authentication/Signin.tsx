import "./authentication.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "../../components";
import { validLoginFormChecker } from "./utils";
import { PasswordInput } from "../../components/input/PasswordInput";
import { Navbar } from "../../components";
import { FormErrorsType, ReactChangeEvent, ReactMouseEvent } from "../../types";

const Signin = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({} as FormErrorsType);
  const [submitted, setSubmitted] = useState(false);

  const changeHandler = (e: ReactChangeEvent) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };
  const formSubmitHandler = (e: ReactMouseEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  useEffect(() => {
    setFormErrors(() => validLoginFormChecker(userInput));
  }, [userInput, submitted]);

  return (
    <div className="form-wrapper">
      <Navbar />
      <div className="form-container flex-total-center">
        <form className="form-grp">
          <h2 className="text-center text-lg">Signin</h2>
          <Input
            type="Email"
            required={true}
            label="Email"
            name="email"
            defaultValue={userInput.email}
            changeHandler={changeHandler}
            showError={submitted}
            helperText={formErrors.email}
          />

          <PasswordInput
            required={true}
            label="Password"
            name="password"
            defaultValue={userInput.password}
            changeHandler={changeHandler}
            showError={submitted}
            helperText={formErrors.password}
          />

          <div className="options">
            <input type="checkbox" name="remember me" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>

            <a className="link-btn" href="/">
              Forgot your password?
            </a>
          </div>

          <button className="btn btn-primary btn-submit" onClick={e => formSubmitHandler(e)}>
            Login
          </button>
          <button className="btn btn-outline-primary btn-submit">
            Login with test credentials
          </button>

          <div className="redirect-link text-center">
            <Link className="link-btn flex-total-center" to="/sign-up">
              Create new account<i className="fas fa-chevron-right"></i>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Signin };
