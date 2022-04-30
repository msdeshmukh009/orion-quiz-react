import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../firebase-config";

const loginService = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signupService = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logoutService = () => {
  signOut(auth);
};

export { loginService, signupService, logoutService };
