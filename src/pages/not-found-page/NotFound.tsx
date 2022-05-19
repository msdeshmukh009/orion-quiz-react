import "./notFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found-container flex-total-center flex-column">
      <>
        <h1>404 page not found</h1>
        <Link className="btn btn-primary" to="/">
          Go back home
        </Link>
      </>
    </main>
  );
};

export { NotFound };
