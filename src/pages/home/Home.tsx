import "./home.css";
import { Footer, Navbar, CategoryCard, Loading } from "../../components";
import { useGame, useTheme } from "../../hooks";
import { useQuiz } from "../../context";
import { useEffect } from "react";

const Home = () => {
  const { currentTheme } = useTheme();

  const {
    quizState: { categoryData, isLoading },
  } = useQuiz();

  const { gameDispatch } = useGame();

  useEffect(() => {
    gameDispatch({ type: "RESET_QUIZ" });
  }, [gameDispatch]);

  return (
    <div className={`home-container ${currentTheme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="main-container">
        <section className="grid-50-50">
          <div className="banner-details text-center">
            <h1 className="text-primary-color text-xl banner-heading">The Orion Quiz</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, sunt!</p>
            <div className="section-cta">
              <a className="btn btn-primary" href="#categories">
                Explore Categories
              </a>
            </div>
          </div>
          <div className="banner-image">
            <img
              className="responsive-img"
              src="/assets/undraw_lost_online_re_upmy.svg"
              alt="the-banner-svg-of-boy-holding-phone-in-hand"
            />
          </div>
        </section>

        <section className="category-section">
          <h1 className="text-center text-xl">Categories</h1>
          <div className="category-grid" id="categories">
            {isLoading && <Loading />}
            {categoryData?.map(
              (category: {
                id: string;
                categoryDescription: string;
                categoryImage: string;
                categoryName: string;
                categoryStatus: string;
              }) => {
                return <CategoryCard key={category.id} category={category} />;
              }
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export { Home };
