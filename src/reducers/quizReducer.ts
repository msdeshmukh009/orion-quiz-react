import { DocumentData } from "firebase/firestore";
import { QuizState, ActionType } from "../types";
const quizInitialState = {
  isLoading: false,
  error: "",
  categoryData: [] as DocumentData,
  quizzes: [] as DocumentData,
};

const quizReducer = (state: QuizState, action: ActionType) => {
  switch (action.type) {
    case "INITIALIZE":
      return { ...state, isLoading: true, error: "" };
    case "SET_ERROR":
      return { ...state, isLoading: false, error: action.payload.error };
    case "SET_CATEGORIES":
      return { ...state, isLoading: false, categoryData: action.payload.categoryData };
    case "SET_QUIZZES":
      return { ...state, isLoading: false, quizzes: action.payload.quizzes };
  }
};
export { quizInitialState, quizReducer };
