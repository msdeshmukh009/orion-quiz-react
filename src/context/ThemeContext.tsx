import { createContext, useState } from "react";
import { ReactChildren, ThemeContextType } from "../types";

const ThemeContext = createContext({} as ThemeContextType);

const ThemeProvider = ({ children }: ReactChildren) => {
  const [currentTheme, setCurrentTheme] = useState(
    JSON.parse(localStorage.getItem("orion-quiz-theme") || "{}") && "dark"
  );
  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
