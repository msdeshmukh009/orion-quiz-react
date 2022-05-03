import "./fonts/ultra/ultra.woff";
import "./fonts/ultra/ultra.woff2";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, QuizProvider, ThemeProvider } from "./context";
import { GameProvider } from "./context/GameContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <QuizProvider>
            <GameProvider>
              <App />
            </GameProvider>
          </QuizProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
