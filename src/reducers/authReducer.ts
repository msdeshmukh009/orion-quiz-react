import { AuthAction, authState } from "../types";

const initialState = {
  isLoading: false,
  error: "",
  isAuthenticated: false,
  uid: "",
};

const authReducer = (state: authState, action: AuthAction) => {
  switch (action.type) {
    case "INITIALIZE":
      return { ...state, isLoading: true, error: "" };
    case "SET_ERROR":
      return { ...state, isLoading: false, error: action.payload.error };
    case "SET_AUTHENTICATION":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.payload.isAuthenticated,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};

export { authReducer, initialState };
