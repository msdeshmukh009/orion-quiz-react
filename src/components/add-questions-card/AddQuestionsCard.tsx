import "./addQuestionsCard.css";
import { ChangeEvent, useState } from "react";
import { ReactChangeEvent, QuizData } from "../../types";

const AddQuestionsCard = ({
  setQuizData,
  questionNumber,
  quizData,
}: {
  setQuizData: React.Dispatch<React.SetStateAction<QuizData>>;
  questionNumber: number;
  quizData: QuizData;
}) => {
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    questionImage: "",
    correctOptionIndex: 0,
  });

  const changeHandler = (e: ReactChangeEvent | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const checkValidInput = () => {
    const { question, option1, option2, option3, option4, correctOptionIndex } = questionData;
    if (
      question.trim() &&
      option1.trim() &&
      option2.trim() &&
      option3.trim() &&
      option4.trim() &&
      correctOptionIndex > 0 &&
      correctOptionIndex <= 4
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddQuestion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setQuizData(prevData => {
      const copy = prevData.questions.slice();
      copy[questionNumber] = {
        question: questionData.question,
        options: [
          questionData.option1,
          questionData.option2,
          questionData.option3,
          questionData.option4,
        ],
        questionImage: questionData.questionImage,
        correctOptionIndex: questionData.correctOptionIndex,
      };
      return { ...prevData, questions: copy };
    });
  };

  return (
    <div className="question-form-wrapper">
      <form className="question-form">
        <div className="input-grp">
          <textarea
            required
            className="form-field"
            placeholder="Question"
            name="question"
            value={questionData.question}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className="grid-50-50">
          <div className="input-grp">
            <label className="form-label form-label-required">Option 1</label>
            <input
              className="form-field"
              type="text"
              placeholder="Option 1"
              name="option1"
              value={questionData.option1}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="input-grp">
            <label className="form-label form-label-required">Option 2</label>
            <input
              className="form-field"
              type="text"
              placeholder="Option 2"
              name="option2"
              value={questionData.option2}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="input-grp">
            <label className="form-label form-label-required">Option 3</label>
            <input
              className="form-field"
              type="text"
              placeholder="Option 3"
              name="option3"
              value={questionData.option3}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="input-grp">
            <label className="form-label form-label-required">Option 4</label>
            <input
              className="form-field"
              type="text"
              placeholder="Option 4"
              name="option4"
              value={questionData.option4}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="input-grp">
            <label className="form-label form-label-required">Correct Option</label>
            <input
              className="form-field"
              type="number"
              placeholder="Correct option number"
              min={1}
              step={1}
              max={4}
              name="correctOptionIndex"
              value={questionData.correctOptionIndex}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="input-grp">
            <label className="form-label">Question Image</label>
            <input
              className="form-field"
              type="text"
              placeholder="Question Image"
              name="questionImage"
              value={questionData.questionImage}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="flex-total-center">
          <button
            className="btn btn-primary"
            disabled={!checkValidInput()}
            onClick={handleAddQuestion}
          >
            {quizData.questions[questionNumber] ? "Update Question" : "Add Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export { AddQuestionsCard };
