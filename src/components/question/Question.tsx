import { useEffect, useState } from "react";
import { useGame, useTimer } from "../../hooks";
import { Modal } from "../Modal/Modal";

const Question = () => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const { sec, minutes } = useTimer(setShowModal);
  const {
    gameState: { questions, currentQuestionIndex, selectedOptions },
    getNextQuestion,
    getPrevQuestion,
    submitQuiz,
  } = useGame();

  useEffect(() => {
    setSelectedOptionIndex(selectedOptions[currentQuestionIndex]);
  }, [currentQuestionIndex, selectedOptions]);

  const { question, questionImage, options } = questions[currentQuestionIndex];

  return (
    <div className="grid-50-50 question-box">
      <Modal showModal={showModal}>
        <div className="flex-total-center timer-modal">
          <h1>Oops!! Times Up.😢</h1>
          <button
            className="btn btn-primary next-btn"
            onClick={() => submitQuiz(selectedOptionIndex)}
          >
            Check Result
          </button>
        </div>
      </Modal>
      <div className="question-image">
        <img
          className="responsive-img rounded-corner-img"
          src={!questionImage ? "/assets/undraw_online_test_gba7.svg" : questionImage}
          alt={question}
        />
      </div>
      <div className="question">
        <div className="flex-total-center question-head">
          <h3>Question {currentQuestionIndex + 1}</h3>
          <span className={`timer ${minutes === 0 && sec < 10 ? "text-danger" : ""}`}>
            {minutes < 10 ? `0${minutes}` : minutes}:{sec < 10 ? `0${sec}` : sec}
          </span>
        </div>
        <p className="question-statement text-lg">{question}</p>
        <div className="options grid-50-50">
          {options?.map((option: string, index: number) => (
            <div
              onClick={() => setSelectedOptionIndex(index)}
              key={index}
              className={`option shadow ${selectedOptionIndex === index ? "selected-option" : ""}`}
            >
              {option}
            </div>
          ))}
        </div>
        <div className="question-cta">
          <button
            disabled={currentQuestionIndex === 0}
            className="btn btn-outline prev-btn"
            onClick={() => getPrevQuestion(currentQuestionIndex)}
          >
            <i className="fal fa-chevron-left"></i> Prev
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              className="btn btn-outline-success next-btn"
              onClick={() => submitQuiz(selectedOptionIndex)}
            >
              Submit <i className="far fa-check"></i>
            </button>
          ) : (
            <button
              className="btn btn-outline next-btn"
              onClick={() => getNextQuestion(currentQuestionIndex, selectedOptionIndex)}
            >
              Next <i className="fal fa-chevron-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { Question };
