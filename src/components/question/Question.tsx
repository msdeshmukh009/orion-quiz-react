import { useEffect, useState } from "react";
import { useGame } from "../../hooks";

const Question = () => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const {
    gameState: { questions, currentQuestionIndex, selectedOptions },
    getNextQuestion,
    getPrevQuestion,
    submitQuiz,
  } = useGame();

  useEffect(() => {
    setSelectedOptionIndex(selectedOptions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  const { question, questionImage, options } = questions[currentQuestionIndex];

  return (
    <div className="grid-50-50 question-box">
      <div className="question-image">
        <img className="responsive-img rounded-corner-img" src={questionImage} alt={question} />
      </div>
      <div className="question">
        <h3>Question {currentQuestionIndex + 1}</h3>
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
