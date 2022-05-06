type QuestionType = {
  question: string;
  options: string[];
  questionImage: string;
  correctOptionIndex: number | undefined;
};

type QuizData = {
  quizName: string;
  quizDescription: string;
  quizCategory: string;
  quizImage: string;
  noOfQuestions: number;
  questions: QuestionType[];
};

export type { QuestionType, QuizData };
