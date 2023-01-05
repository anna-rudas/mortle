import React from "react";
import { createRoot } from "react-dom/client";
import Background from "./components/Background/Background";

function App() {
  return (
    <div className="wrapper">
      <Background />
    </div>
  );
}

export default App;
createRoot(document.getElementById("root")!).render(<App />);
