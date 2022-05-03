import { useTheme } from "./hooks";
import { NavigationRoutes } from "./routes/NavigationRoutes";

const App = () => {
  const { currentTheme } = useTheme();

  return (
    <div className={`${currentTheme === "dark" ? "dark" : "light"}`}>
      <NavigationRoutes />
    </div>
  );
};

export { App };
