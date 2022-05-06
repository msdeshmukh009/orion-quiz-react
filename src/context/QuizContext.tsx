import { createContext, useEffect, useReducer } from "react";
import { getCategories, getQuizzes } from "../utils/firebaseHelpers";
import { quizInitialState, quizReducer } from "../reducers";
import { QuizContextType, ReactChildren } from "../types";
import { getErrorMessage } from "../utils";

const QuizContext = createContext({} as QuizContextType);

const QuizProvider = ({ children }: ReactChildren) => {
  const [quizState, quizDisPatch] = useReducer(quizReducer, quizInitialState);

  useEffect(() => {
    (async () => {
      try {
        quizDisPatch({ type: "INITIALIZE" });
        const response = await getCategories();
        quizDisPatch({ type: "SET_CATEGORIES", payload: { categoryData: response } });
      } catch (err) {
        quizDisPatch({ type: "SET_ERROR", payload: { error: getErrorMessage(err) } });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        quizDisPatch({ type: "INITIALIZE" });
        const response = await getQuizzes();
        quizDisPatch({ type: "SET_QUIZZES", payload: { quizzes: response } });
      } catch (err) {
        quizDisPatch({ type: "SET_ERROR", payload: { error: getErrorMessage(err) } });
      }
    })();
  }, []);

  return (
    <QuizContext.Provider value={{ quizState, quizDisPatch }}>{children}</QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
