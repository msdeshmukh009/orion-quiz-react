import { DocumentData } from "firebase/firestore";
import { GameState, GameActionType } from "../types";

const gameInitialState = {
  isLoading: false,
  error: "",
  questions: [] as DocumentData,
  currentQuestionIndex: 0,
  selectedOptions: [] as number[],
  quizTitle: "",
};

const gameReducer = (state: GameState, action: GameActionType) => {
  switch (action.type) {
    case "INITIALIZE":
      return { ...state, isLoading: true, error: "" };

    case "SET_ERROR":
      return { ...state, isLoading: false, error: action.payload.error };

    case "SET_QUESTIONS":
      return {
        ...state,
        isLoading: false,
        questions: action.payload.questions,
        quizTitle: action.payload.quizTitle,
      };

    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestionIndex: action.payload.currentQuestionIndex };

    case "SET_SELECTED_OPTIONS":
      const tempArr = state.selectedOptions.slice();
      tempArr[state.currentQuestionIndex] = action.payload.selectedOptionIndex;
      return { ...state, selectedOptions: tempArr };

    case "RESTART_QUIZ":
      return { ...state, selectedOptions: [], currentQuestionIndex: 0 };

    case "RESET_QUIZ":
      return gameInitialState;

    default:
      return state;
  }
};
export { gameInitialState, gameReducer };
