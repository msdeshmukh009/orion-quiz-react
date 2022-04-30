import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { LogInUserInput, UserDetailType } from "../types";
import { signupService, logoutService, loginService } from "../services";
import { auth } from "../firebase-config";
import { createUserDocument } from "../utils";
import { getErrorMessage } from "../utils";
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      (async () => {
        if (currentUser) {
          authDispatch({
            type: "SET_AUTHENTICATION",
            payload: {
              isAuthenticated: true,
              uid: currentUser.uid,
            },
          });
        } else {
          authDispatch({
            type: "SET_AUTHENTICATION",
            payload: {
              isAuthenticated: false,
              uid: "",
            },
          });
        }
      })();
    });
  }, [authDispatch]);

  const signUp = async (userInput: LogInUserInput & UserDetailType, from: { pathname: string }) => {
    const { email, password, firstName, lastName } = userInput;
    try {
      authDispatch({ type: "INITIALIZE" });

      const { user } = await signupService(email, password);

      await createUserDocument(user, { firstName, lastName });

      navigate(from, { replace: true });
    } catch (err) {
      if (getErrorMessage(err) === "Firebase: Error (auth/email-already-in-use).") {
        authDispatch({
          type: "SET_ERROR",
          payload: {
            error: "Email is already registered. Try to login",
          },
        });
      } else {
        authDispatch({
          type: "SET_ERROR",
          payload: {
            error: "Something went wrong. Try again after some time.",
          },
        });
      }
    }
  };

  const login = async (userInput: LogInUserInput, from: { pathname: string }) => {
    const { email, password } = userInput;
    try {
      authDispatch({ type: "INITIALIZE" });
      await loginService(email, password);

      navigate(from, { replace: true });
    } catch (err) {
      if (getErrorMessage(err) === "Firebase: Error (auth/wrong-password).") {
        authDispatch({
          type: "SET_ERROR",
          payload: {
            error: "Entered email and password credentials doesn't match. Please try again.",
          },
        });
      } else if (getErrorMessage(err) === "Firebase: Error (auth/user-not-found).") {
        authDispatch({
          type: "SET_ERROR",
          payload: {
            error: "User not found",
          },
        });
      } else {
        authDispatch({
          type: "SET_ERROR",
          payload: {
            error: "Something went wrong. Try again after some time.",
          },
        });
      }
    }
  };

  const logout = () => {
    logoutService();
    navigate("/");
  };

  return { signUp, logout, login, authState };
};
export { useAuth };
