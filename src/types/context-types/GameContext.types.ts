import { DocumentData } from "firebase/firestore";

type GameContextType = {
  gameState: GameState;
  gameDispatch: React.Dispatch<GameActionType>;
};

type GameState = {
  isLoading: boolean;
  error: string;
  questions: DocumentData;
  currentQuestionIndex: number;
  selectedOptions: number[];
  quizTitle: string;
};

type InitializeAction = {
  type: "INITIALIZE";
};

type ErrorAction = {
  type: "SET_ERROR";
  payload: {
    error: string;
  };
};

type QuestionsAction = {
  type: "SET_QUESTIONS";
  payload: {
    questions: DocumentData;
    quizTitle: string;
  };
};

type CurrentQuestionIndexAction = {
  type: "SET_CURRENT_QUESTION";
  payload: {
    currentQuestionIndex: number;
  };
};

type SelectedOptionsAction = {
  type: "SET_SELECTED_OPTIONS";
  payload: {
    selectedOptionIndex: number;
  };
};

type ResetQuizAction = {
  type: "RESET_QUIZ";
};
type RestartQuizAction = {
  type: "RESTART_QUIZ";
};
type GameActionType =
  | InitializeAction
  | ErrorAction
  | QuestionsAction
  | CurrentQuestionIndexAction
  | SelectedOptionsAction
  | ResetQuizAction
  | RestartQuizAction;

export type { GameState, GameActionType, GameContextType };
