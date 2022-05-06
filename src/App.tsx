import { useTheme } from "./hooks";
import { NavigationRoutes } from "./routes/NavigationRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { currentTheme } = useTheme();

  return (
    <div className={`${currentTheme === "dark" ? "dark" : "light"}`}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: { background: "var(--background-color)", color: "var(--text-color)" },
        }}
      />
      <NavigationRoutes />
    </div>
  );
};

export { App };
