import "./exploreQuiz.css";
import { DocumentData } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Footer, Navbar, QuizCard } from "../../components";
import { useEffect, useState } from "react";
import { useQuiz, useTheme } from "../../hooks";

const ExploreQuiz = () => {
  const { currentTheme } = useTheme();
  const [quizData, setQuizData] = useState<DocumentData>();

  const {
    quizState: { quizzes },
  } = useQuiz();

  const { quizId } = useParams();

  useEffect(() => {
    setQuizData(quizzes.filter((quiz: DocumentData) => quiz.quizCategory === quizId));
  }, [quizId, quizzes]);

  return (
    <div className={`explore-quiz-container ${currentTheme === "dark" ? "dark" : "light"}`}>
      <Navbar />
      <main className="quiz-display-container">
        {quizData?.map(
          (quiz: {
            id: string;
            quizCategory: string;
            quizDescription: string;
            quizImage: string;
            quizName: string;
            quizStatus: string;
          }) => {
            return <QuizCard key={quiz.id} quiz={quiz} />;
          }
        )}
      </main>
      <Footer />
    </div>
  );
};

export { ExploreQuiz };
