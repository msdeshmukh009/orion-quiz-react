import { useContext } from "react";
import { QuizContext } from "../context";
import { getErrorMessage, getQuizzes } from "../utils";

const useQuiz = () => {
  const { quizDisPatch, quizState } = useContext(QuizContext);

  const refreshQuizzes = async () => {
    try {
      quizDisPatch({ type: "INITIALIZE" });
      const response = await getQuizzes();
      quizDisPatch({ type: "SET_QUIZZES", payload: { quizzes: response } });
    } catch (err) {
      quizDisPatch({ type: "SET_ERROR", payload: { error: getErrorMessage(err) } });
    }
  };

  return { quizDisPatch, quizState, refreshQuizzes };
};

export { useQuiz };
