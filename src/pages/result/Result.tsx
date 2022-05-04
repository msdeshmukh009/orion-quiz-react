import "./result.css";
import { Footer, Navbar, ResultCard } from "../../components";
import { useGame, useTheme } from "../../hooks";
import { Link } from "react-router-dom";

const Result = () => {
  const { currentTheme } = useTheme();
  const {
    gameState: { questions, selectedOptions },
  } = useGame();

  const correctOptionsArray = questions.map(
    (question: { correctOptionIndex: string }) => question.correctOptionIndex
  );

  const score = selectedOptions.reduce(
    (acc, curr, index) => (curr === Number(correctOptionsArray[index]) ? acc + 10 : acc),
    0
  );

  return (
    <div className={`result-container flex-column ${currentTheme === "dark" ? "dark" : "light"}`}>
      <Navbar />
      <div className="result-head flex-column">
        <h1 className="text-center">Quiz Result</h1>
        <div className="text-center">
          <span className="flex-column">
            Your score
            <span className="text-lg">
              {score}/{questions.length * 10}
            </span>
          </span>
        </div>
      </div>

      <main className="answers text-center">
        <h2 className="text-center">Check Answers</h2>
        {questions.map(
          (
            question: {
              id: string;
              question: string;
              options: string[];
              correctOptionIndex: number;
            },
            index: number
          ) => (
            <ResultCard
              key={question.id}
              question={question.question}
              options={question.options}
              correctOption={question.correctOptionIndex}
              questionIndex={index}
            />
          )
        )}
        <div>
          <Link to="/#categories" className="btn btn-primary">
            Take another quiz
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { Result };
