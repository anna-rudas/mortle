import React from "react";
import { createRoot } from "react-dom/client";
import Background from "./components/Background/Background";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="wrapper">
      <Background />
      <Header />
    </div>
  );
}

export default App;
createRoot(document.getElementById("root")!).render(<App />);
