import "../category-card/categoryCard.css";
import { Link } from "react-router-dom";
import { QuizCardProp } from "../../types";

const QuizCard = ({ quiz }: QuizCardProp) => {
  const { quizName, quizDescription, quizStatus, quizImage } = quiz;
  return (
    <div className="card vertical-card max-w-xs shadow">
      <div className="card-image-container">
        <img className="responsive-img rounded-top-corner-img" src={quizImage} alt={quizName} />
      </div>
      <div className="card-info-container">
        <span className="text-bold card-heading">{quizName}</span>
        <span className="card-sub-heading">{quizDescription}</span>
      </div>
      {quizStatus === "available" ? (
        <div className="card-cta-vertical">
          <Link to="/rules" className="btn btn-primary block-btn text-center">
            Play Now
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export { QuizCard };
