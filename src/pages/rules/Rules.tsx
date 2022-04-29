import "./rules.css";
import { useTheme } from "../../hooks";
import { Navbar, Footer } from "../../components";
import { Link } from "react-router-dom";
const Rules = () => {
  const { currentTheme } = useTheme();
  return (
    <div className={`rules-container ${currentTheme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="rules flex-column">
        <h1 className="text-center">The Rules are Simple</h1>
        <ul className="circle-bullet-list styled-list">
          <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, placeat!</li>
          <li>Lorem ipsum dolor sit amet . Delectus, placeat!</li>
          <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.!</li>
        </ul>
        <div className="flex-total-center">
          <Link to="/question" className="btn btn-primary">
            Start Quiz
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export { Rules };
