import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import { getErrorMessage, getQuiz } from "../utils";

const useGame = () => {
  const { gameState, gameDispatch } = useContext(GameContext);

  const navigate = useNavigate();

  const getQuestions = async (quizId: string, quizTitle: string) => {
    try {
      gameDispatch({ type: "INITIALIZE" });
      const questionsResponse = await getQuiz(quizId);
      gameDispatch({
        type: "SET_QUESTIONS",
        payload: { questions: questionsResponse, quizTitle: quizTitle },
      });
    } catch (err) {
      console.log(err);
      gameDispatch({ type: "SET_ERROR", payload: { error: getErrorMessage(err) } });
    }
  };

  const getPrevQuestion = (currentQuestionIndex: number) => {
    gameDispatch({
      type: "SET_CURRENT_QUESTION",
      payload: { currentQuestionIndex: Number(currentQuestionIndex - 1) },
    });
  };

  const getNextQuestion = (currentQuestionIndex: number, selectedOptionIndex: number) => {
    gameDispatch({
      type: "SET_SELECTED_OPTIONS",
      payload: { selectedOptionIndex: selectedOptionIndex },
    });
    gameDispatch({
      type: "SET_CURRENT_QUESTION",
      payload: { currentQuestionIndex: Number(currentQuestionIndex + 1) },
    });
  };

  const submitQuiz = (selectedOptionIndex: number) => {
    gameDispatch({
      type: "SET_SELECTED_OPTIONS",
      payload: { selectedOptionIndex: selectedOptionIndex },
    });
    navigate("/result", { replace: true });
  };

  return { gameState, gameDispatch, getQuestions, getNextQuestion, getPrevQuestion, submitQuiz };
};

export { useGame };
