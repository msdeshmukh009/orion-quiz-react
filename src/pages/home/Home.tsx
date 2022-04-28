import "./home.css";
import { Footer, Navbar, CategoryCard } from "../../components";
import { useTheme } from "../../hooks";

const Home = () => {
  const { currentTheme } = useTheme();
  const categoryData = [
    {
      categoryName: "The Space Quiz",
      categoryDescription: "The ultimate space quiz for space geeks.",
      categoryImage:
        "https://raw.githubusercontent.com/msdeshmukh009/orion-quiz/dev/assets/astronaut-1784245__340.webp",
      categoryStatus: "available",
    },
    {
      categoryName: "The Space Movie Quiz",
      categoryDescription: "Coming Soon...",
      categoryImage:
        "https://raw.githubusercontent.com/msdeshmukh009/orion-quiz/dev/assets/space-movie5.jpg",
      categoryStatus: "not-available",
    },
    {
      categoryName: "The Martian Quiz",
      categoryDescription: "Coming Soon...",
      categoryImage:
        "https://raw.githubusercontent.com/msdeshmukh009/orion-quiz/dev/assets/martial-quiz.jpg",
      categoryStatus: "not-available",
    },
    {
      categoryName: "The Rick & Morty Quiz",
      categoryDescription: "Coming Soon...",
      categoryImage:
        "https://raw.githubusercontent.com/msdeshmukh009/orion-quiz/dev/assets/rick-morty2.jpg",
      categoryStatus: "not-available",
    },
  ];
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
            {categoryData.map((category, index) => {
              return <CategoryCard key={index} category={category} />; //TODO:Give a valid key
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export { Home };
