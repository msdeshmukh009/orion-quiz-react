import "./navbar.css";
import { Link } from "react-router-dom";
import { useTheme, useAuth } from "../../hooks";

const Navbar = () => {
  const { currentTheme, handleCurrentTheme } = useTheme();
  const {
    authState: { isAuthenticated },
  } = useAuth();

  return (
    <nav className="nav-wrapper">
      <div className="nav">
        <header className="nav-header flex-total-center">
          <button className="btn btn-outline burger-menu">
            <i className="fas fa-bars"></i>
          </button>

          <Link to="/" className="nav-link nav-heading text-bold">
            Orion
          </Link>
        </header>

        <ul className="inline-style-list no-style-list nav-list flex-total-center">
          <li>
            <Link to="/" className="link-btn nav-desktop-element" title="Home">
              Home
            </Link>
          </li>

          <li>
            <Link
              to={`${isAuthenticated ? "/profile" : "/sign-in"}`}
              className="anchor-tag-badge-container"
              title={`${isAuthenticated ? "Profile" : "Login"}`}
            >
              <i className="fas fa-user "></i>
            </Link>
          </li>

          <li className="nav-list-web-item">
            <button
              className={`theme-toggle-btn text-md ${
                currentTheme === "light" ? "rotate-light" : "rotate"
              }`}
              onClick={handleCurrentTheme}
            >
              <i className={`fas fa-${currentTheme === "light" ? "moon" : "sun"}`}></i>
            </button>
          </li>
          {isAuthenticated ? (
            <li>
              <Link
                to="/create-quiz"
                className="btn btn-outline-primary flex-total-center create-your-quiz-btn"
                title="Create Quiz"
              >
                <span className="nav-desktop-element">Create your quiz</span>
                <i className="fas fa-plus "></i>
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export { Navbar };
