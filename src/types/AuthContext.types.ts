type authState = {
  isLoading: boolean;
  error: string;
  isAuthenticated: boolean;
  uid: string;
};

type AuthenticationAction = {
  type: "SET_AUTHENTICATION";
  payload: {
    isAuthenticated: boolean;
    uid: string;
  };
};
type ErrorAction = {
  type: "SET_ERROR";
  payload: {
    error: string;
  };
};

type InitializeAction = {
  type: "INITIALIZE";
};

type AuthAction = AuthenticationAction | InitializeAction | ErrorAction;

type AuthContextType = {
  authState: authState;
  authDispatch: React.Dispatch<AuthAction>;
};

export type { AuthAction, AuthContextType, authState };
