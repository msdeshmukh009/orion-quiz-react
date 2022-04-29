import { Link, useLocation } from "react-router-dom";

const Question = () => {
  const { pathname } = useLocation();
  return (
    <div className="grid-50-50">
      <div className="question-image">
        <img
          className="responsive-img rounded-corner-img"
          src="https://orion-quiz.netlify.app/assets/golden-record-diagram.jpg"
          alt="golden-record-voyger-spacecraft"
        />
      </div>
      <div className="question">
        <h3>Question 1</h3>
        <p className="question-statement text-lg">
          The first man made object to leave the solar system and enter interstellar space was.
        </p>
        <div className="options grid-50-50">
          <div className="option shadow">Hubble Telescope</div>
          <div className="option shadow">The International Space Station (ISS)</div>
          <div className={`option shadow ${pathname === "/result" ? "correct-answer" : ""}`}>
            The Voyager 1 spacecraft
          </div>
          <div className="option shadow">Sputnik 1</div>
        </div>
        {pathname !== "/result" ? (
          <div className="question-cta">
            <Link to="/result" className="btn btn-primary">
              Next <i className="fal fa-chevron-right"></i>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { Question };
