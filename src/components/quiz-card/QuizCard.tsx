import "../category-card/categoryCard.css";
import { useNavigate } from "react-router-dom";
import { QuizCardProp } from "../../types";
import { useGame } from "../../hooks";

const QuizCard = ({ quiz }: QuizCardProp) => {
  const { id, quizName, quizDescription, quizStatus, quizImage } = quiz;
  const { getQuestions } = useGame();
  const navigate = useNavigate();

  const handlePlayNow = async () => {
    try {
      await getQuestions(id, quizName);
      navigate("/rules");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card vertical-card max-w-xs shadow">
      <div className="card-image-container">
        <img
          width="300"
          height="168"
          className="responsive-img rounded-top-corner-img"
          src={quizImage}
          alt={quizName}
        />
      </div>
      <div className="card-info-container">
        <span className="text-bold card-heading">{quizName}</span>
        <span className="card-sub-heading">{quizDescription}</span>
      </div>
      {quizStatus === "available" ? (
        <div className="card-cta-vertical">
          <button onClick={handlePlayNow} className="btn btn-primary block-btn text-center">
            Play Now
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { QuizCard };
