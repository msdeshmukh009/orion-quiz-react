import "./exploreQuiz.css";
import { Footer, Navbar, QuizCard } from "../../components";
import { useTheme } from "../../hooks";

const ExploreQuiz = () => {
  const { currentTheme } = useTheme();
  const quizData = [
    {
      quizName: "Know Your Solar System",
      quizDescription: "Test your knowledge of our solar system.",
      quizImage:
        "https://raw.githubusercontent.com/msdeshmukh009/orion-quiz/dev/assets/solar-stm.jpg",
      quizStatus: "available",
    },
    {
      quizName: "Astronomy Quiz",
      quizDescription: "Coming Soon...",
      quizImage:
        "https://raw.githubusercontent.com/msdeshmukh009/orion-quiz/dev/assets/astronomy.jpg",
      quizStatus: "not-available",
    },
  ];
  return (
    <div className={`explore-quiz-container ${currentTheme === "dark" ? "dark" : "light"}`}>
      <Navbar />
      <main className="quiz-display-container">
        {quizData.map((quiz, index) => {
          return <QuizCard key={index} quiz={quiz} />; //TODO:Use valid key
        })}
      </main>
      <Footer />
    </div>
  );
};

export { ExploreQuiz };
