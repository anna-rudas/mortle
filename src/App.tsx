import React from "react";
import { createRoot } from "react-dom/client";
import Background from "./components/Background/Background";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="wrapper">
      <Background />
      <div className="game-content">
        <Header />
        <Game />
      </div>
    </div>
  );
}

export default App;
createRoot(document.getElementById("root")!).render(<App />);
