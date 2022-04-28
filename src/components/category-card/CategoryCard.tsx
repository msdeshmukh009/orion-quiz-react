import "./categoryCard.css";
import { Link } from "react-router-dom";
import { CategoryCardProps } from "../../types";

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { categoryName, categoryDescription, categoryStatus, categoryImage } = category;
  return (
    <div className="card vertical-card max-w-xs shadow">
      <div className="card-image-container">
        <img
          className="responsive-img rounded-top-corner-img"
          src={categoryImage}
          alt={categoryName}
        />
      </div>
      <div className="card-info-container">
        <span className="text-bold card-heading">{categoryName}</span>
        <span className="card-sub-heading">{categoryDescription}</span>
      </div>
      {categoryStatus === "available" ? (
        <div className="card-cta-vertical">
          <Link to="explore-quiz" className="btn btn-primary block-btn text-center">
            Explore Quizzes
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export { CategoryCard };
