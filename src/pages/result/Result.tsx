import "./result.css";
import { Footer, Navbar, Question } from "../../components";
import { useTheme } from "../../hooks";

const Result = () => {
  const { currentTheme } = useTheme();
  return (
    <div className={`result-container flex-column ${currentTheme === "dark" ? "dark" : "light"}`}>
      <Navbar />
      <div className="result-head flex-column">
        <h1 className="text-center">Quiz Result</h1>
        <div className="text-center">
          <span className="flex-column">
            Your score <span className="text-lg">100/100</span>
          </span>
        </div>
      </div>

      <main className="answers text-center">
        <h2 className="text-center">Check Answers</h2>
        <Question />
        <Question />
      </main>
      <Footer />
    </div>
  );
};

export { Result };
