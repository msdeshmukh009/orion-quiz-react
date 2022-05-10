import { DocumentData } from "firebase/firestore";

type QuizContextType = {
  quizState: QuizState;
  quizDisPatch: React.Dispatch<ActionType>;
};

type QuizState = {
  isLoading: boolean;
  error: string;
  categoryData: DocumentData;
  quizzes: DocumentData;
};

type InitializeAction = {
  type: "INITIALIZE";
};

type SetErrorAction = {
  type: "SET_ERROR";
  payload: {
    error: string;
  };
};

type SetCategories = {
  type: "SET_CATEGORIES";
  payload: {
    categoryData: DocumentData;
  };
};

type SetQuizzes = {
  type: "SET_QUIZZES";
  payload: {
    quizzes: DocumentData;
  };
};

type RefreshCategories = {
  type: "REFRESH_CATEGORIES";
};

type ActionType =
  | InitializeAction
  | SetErrorAction
  | SetCategories
  | SetQuizzes
  | RefreshCategories;

export type { ActionType, QuizContextType, QuizState };
