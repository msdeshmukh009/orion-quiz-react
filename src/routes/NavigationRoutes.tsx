import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks";
import { Home, ExploreQuiz, Rules, QuestionPage, Result, Signup, Signin, Profile } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

const NavigationRoutes = () => {
  const {
    authState: { isAuthenticated },
  } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/explore-quiz" element={<ExploreQuiz />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/result" element={<Result />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      {!isAuthenticated ? (
        <>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
        </>
      ) : (
        <>
          <Route path="/sign-up" element={<Navigate replace to="/" />}></Route>
          <Route path="/sign-in" element={<Navigate replace to="/" />}></Route>
        </>
      )}
    </Routes>
  );
};

export { NavigationRoutes };
