import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import Background from "./components/Background/Background";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import { useState } from "react";
import HowToPlay from "./components/HowToPlay/HowToPlay";
import Statistics from "./components/Statistics/Statistics";
import GameResult from "./components/GameResult/GameResult";
import { WordDefinition } from "./types";
import AppContextProvider from "./context";

function App() {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [wordMeaning, setWordMeaning] = useState<WordDefinition>({
    isDef: false,
    def: {},
  });

  const openHowToPlay = () => {
    setIsHowToPlayOpen(true);
  };
  const closeHowToPlay = () => {
    setIsHowToPlayOpen(false);
  };
  const openStatistics = () => {
    setIsStatisticsOpen(true);
  };
  const closeStatistics = () => {
    setIsStatisticsOpen(false);
  };
  const openGameResult = () => {
    setIsResultsOpen(true);
  };
  const closeGameResult = () => {
    setIsResultsOpen(false);
  };

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRandomWord(data[0]);
      })
      .catch((error) => {
        //TODO: retry (need loading state), otherwise let user know that couldn't fetch word
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (randomWord != "") {
      //testing word: rotas ${randomWord}
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.title) {
            setWordMeaning({ isDef: false, def: {} });
          } else {
            setWordMeaning({ isDef: true, def: data[0] });
          }
        })
        .catch((error) => {
          //TODO: retry (need loading state)
          console.error(error);
        });
    }
  }, [randomWord]);

  return (
    <div className="wrapper">
      <Background />
      <div className="game-content">
        <Header openHowToPlay={openHowToPlay} openStatistics={openStatistics} />
        <Game />
        {isHowToPlayOpen && <HowToPlay closeHowToPlay={closeHowToPlay} />}
        {isStatisticsOpen && <Statistics closeStatistics={closeStatistics} />}
      </div>
      {isResultsOpen && (
        <GameResult
          wordDefinition={wordMeaning}
          solutionWord={randomWord}
          closeGameResult={closeGameResult}
        />
      )}
    </div>
  );
}

function AppWithProvider() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

export default AppWithProvider;

createRoot(document.getElementById("root")!).render(<AppWithProvider />);
