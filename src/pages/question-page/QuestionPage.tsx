import "./questionPage.css";
import { useTheme } from "../../hooks";
import { Navbar, Footer, Question } from "../../components";

const QuestionPage = () => {
  const { currentTheme } = useTheme();
  return (
    <div className={`question-wrapper ${currentTheme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="question-container text-center">
        <h1>Know Your Solar System</h1>
        <Question />
      </main>

      <Footer />
    </div>
  );
};

export { QuestionPage };
