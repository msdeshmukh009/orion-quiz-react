import { useTheme } from "../../hooks";
import "./footer.css";
const Footer = () => {
  const { currentTheme } = useTheme();
  return (
    <footer className={`footer ${currentTheme === "dark" ? "dark" : "light"}`}>
      <ul className="inline-style-list no-style-list footer-list">
        <li>
          <a
            className="footer-links"
            href="https://github.com/msdeshmukh009"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li>
          <a
            className="footer-links"
            href="https://twitter.com/msdeshmukh09"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a
            className="footer-links"
            href="https://www.linkedin.com/in/mahesh-deshmukh-413830185/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
      </ul>
      <p>© 2022 Orion</p>
    </footer>
  );
};

export { Footer };
