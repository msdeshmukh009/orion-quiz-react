import "./createQuiz.css";
import { useState } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Footer, Navbar, AddQuestionsCard, Loading } from "../../components";
import { ReactChangeEvent, QuestionType, ReactChangeEventSelect } from "../../types";
import { addQuiz, addQuestion, getErrorMessage, makeNumberArray } from "../../utils";
import { Modal } from "../../components";
import { useQuiz } from "../../hooks";

const CreateQuiz = () => {
  const [isAddingQuestion, setIsAddingQuestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState({
    quizName: "",
    quizDescription: "",
    quizCategory: "The Space Quiz",
    quizImage: "",
    noOfQuestions: 1,
    questions: [] as QuestionType[],
  });

  const {
    refreshQuizzes,
    quizState: { categoryData },
  } = useQuiz();

  const navigate = useNavigate();

  const changeHandler = (e: ReactChangeEvent | ReactChangeEventSelect) => {
    const { name, value } = e.target;
    if (name === "noOfQuestions") {
      setQuizData({ ...quizData, [name]: Number(value) });
    } else {
      setQuizData({ ...quizData, [name]: value });
    }
  };

  const handleNextButtonDisable = () => {
    const { quizName, quizDescription, quizCategory, noOfQuestions } = quizData;
    if (quizName && quizDescription && quizCategory && 0 < noOfQuestions && noOfQuestions <= 10) {
      return false;
    } else {
      return true;
    }
  };

  const canSubmit = () => {
    if (quizData.questions.length !== quizData.noOfQuestions) {
      return true;
    } else {
      for (let i = 0; i < quizData.questions.length; i++) {
        if (!quizData.questions[i]) {
          return true;
        }
      }
    }
    return false;
  };

  const handleAddQuiz = async () => {
    setIsLoading(true);

    const promiseArr: Promise<string | DocumentReference<DocumentData>>[] = [];

    try {
      const quizId = await addQuiz({
        quizName: quizData.quizName.trim(),
        quizCategory: quizData.quizCategory.toLocaleLowerCase().replaceAll(" ", "-").trim(),
        quizDescription: quizData.quizDescription.trim(),
        quizImage: quizData.quizImage.trim(),
      });

      quizData.questions.forEach(currentQuestion =>
        promiseArr.push(
          addQuestion({
            quizId,
            questionData: {
              question: currentQuestion.question.trim(),
              options: currentQuestion.options,
              questionImage: currentQuestion.questionImage.trim(),
              correctOptionIndex: Number(currentQuestion.correctOptionIndex) - 1,
            },
          })
        )
      );

      await Promise.all(promiseArr);
      refreshQuizzes();
      navigate(
        `/explore-quiz/${quizData.quizCategory.toLocaleLowerCase().replaceAll(" ", "-").trim()}`
      );
      toast.success("Quiz Created Successfully");
    } catch (err) {
      setIsLoading(false);
      toast.error(`Quiz Creation Failed: ${getErrorMessage(err)}`);
    }
  };

  return (
    <div className="create-quiz-wrapper">
      <Modal showModal={isLoading}>
        <Loading />
      </Modal>

      <Navbar />

      {isAddingQuestion ? (
        <main className="add-questions-container">
          <div>
            <button className="btn btn-outline-primary" onClick={() => setIsAddingQuestions(false)}>
              <i className="fas fa-chevron-left"></i> Go Back
            </button>
          </div>
          <h1>Add Questions</h1>

          {makeNumberArray(quizData.noOfQuestions).map((questionNumber, index) => (
            <AddQuestionsCard
              key={questionNumber}
              setQuizData={setQuizData}
              quizData={quizData}
              questionNumber={index}
            />
          ))}
          <div className="flex-total-center">
            <button
              className="btn btn-primary"
              disabled={canSubmit()}
              onClick={() => handleAddQuiz()}
            >
              Add Quiz
            </button>
          </div>
        </main>
      ) : (
        <main className="create-quiz-container">
          <h1 className="text-center">Create Your Own Quiz</h1>
          <form className="quiz-form" onSubmit={e => e.preventDefault()}>
            <div className="input-grp">
              <label className="form-label form-label-required">Title</label>
              <input
                className="form-field"
                type="text"
                placeholder="Enter title of quiz"
                maxLength={25}
                name="quizName"
                value={quizData.quizName}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="input-grp">
              <label className="form-label form-label-required">Description</label>
              <input
                className="form-field"
                type="text"
                placeholder="Enter small description of quiz"
                maxLength={35}
                name="quizDescription"
                value={quizData.quizDescription}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="input-grp">
              <label className="form-label">Image</label>
              <input
                className="form-field"
                type="text"
                placeholder="Enter url for quiz display image"
                name="quizImage"
                value={quizData.quizImage}
                onChange={changeHandler}
              />
            </div>
            <div className="input-grp">
              <label className="form-label form-label-required">Number of question(Max 10)</label>
              <input
                className="form-field"
                type="number"
                placeholder="Enter number of question"
                max={10}
                step={1}
                min={1}
                name="noOfQuestions"
                value={Number(quizData.noOfQuestions)}
                onChange={changeHandler}
                required
              />
            </div>
            <select
              className="category-dropdown"
              name="quizCategory"
              value={quizData.quizCategory}
              onChange={changeHandler}
            >
              {categoryData.map(({ categoryName }: { categoryName: string }, index: number) => (
                <option key={index}>{categoryName}</option>
              ))}
            </select>
            <div className="quiz-cta">
              <button
                className="btn btn-primary block-btn"
                disabled={handleNextButtonDisable()}
                onClick={() => {
                  setIsAddingQuestions(true);
                }}
              >
                Next <i className="fas fa-chevron-right "></i>
              </button>
            </div>
          </form>
        </main>
      )}
      <Footer />
    </div>
  );
};
export { CreateQuiz };
