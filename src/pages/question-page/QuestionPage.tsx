import "./questionPage.css";
import { useGame, useTheme } from "../../hooks";
import { Navbar, Footer, Question, Modal } from "../../components";
import { useState } from "react";
import { Link } from "react-router-dom";

const QuestionPage = () => {
  const [showModal, setShowMOdal] = useState(false);
  const { currentTheme } = useTheme();
  const {
    gameState: { quizTitle },
  } = useGame();

  return (
    <div className={`question-wrapper ${currentTheme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <Modal showModal={showModal}>
        <div className="quit-quiz-modal flex-column">
          <h3>Are you sure you want to quit?</h3>
          <div className="flex-total-center quit-quiz-modal-cta">
            <Link to="/" className="btn btn-outline-danger">
              Quit
            </Link>
            <button className="btn btn-outline-primary" onClick={() => setShowMOdal(false)}>
              Continue
            </button>
          </div>
        </div>
      </Modal>

      <div className="quit-btn-wrapper">
        <button className="btn btn-outline-danger" onClick={() => setShowMOdal(true)}>
          Quit
        </button>
      </div>
      <main className="question-container text-center">
        <h1>{quizTitle}</h1>
        <Question />
      </main>
      <Footer />
    </div>
  );
};

export { QuestionPage };
