import "./questionPage.css";
import { useGame, useTheme } from "../../hooks";
import { Navbar, Footer, Question } from "../../components";

const QuestionPage = () => {
  const { currentTheme } = useTheme();
  const {
    gameState: { quizTitle },
  } = useGame();

  return (
    <div className={`question-wrapper ${currentTheme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="question-container text-center">
        <h1>{quizTitle}</h1>
        <Question />
      </main>
      <Footer />
    </div>
  );
};

export { QuestionPage };
