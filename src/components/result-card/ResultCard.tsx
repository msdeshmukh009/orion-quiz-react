import { useGame } from "../../hooks";

const ResultCard = ({
  question,
  options,
  questionIndex,
  correctOption,
}: {
  question: string;
  options: string[];
  questionIndex: number;
  correctOption: number;
}) => {
  const {
    gameState: { selectedOptions },
  } = useGame();

  return (
    <div className="result-box">
      <div className="question">
        <h3 className="result-heading">
          Question {questionIndex + 1}
          {selectedOptions[questionIndex] === correctOption ? (
            <span className="text-success">10/10</span>
          ) : selectedOptions[questionIndex] === undefined ? (
            <span className="text-danger">
              0/10<span className="text-xs">(Not attempted)</span>
            </span>
          ) : (
            <span className="text-danger">0/10</span>
          )}
        </h3>
        <p className="question-statement text-lg">{question}</p>
        <div className="options grid-50-50">
          {options?.map((option: string, index: number) => (
            <div
              key={index}
              className={`result-option ${
                selectedOptions[questionIndex] === index
                  ? correctOption === index
                    ? "correct-answer"
                    : "wrong-answer"
                  : Number(correctOption) === index
                  ? "correct-answer"
                  : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ResultCard };
