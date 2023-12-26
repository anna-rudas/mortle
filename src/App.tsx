import React, { useEffect, useContext } from "react";
import { createRoot } from "react-dom/client";
import Background from "./components/Background/Background";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import { useState } from "react";
import HowToPlay from "./components/HowToPlay/HowToPlay";
import Statistics from "./components/Statistics/Statistics";
import GameResult from "./components/GameResult/GameResult";
import LoadingGame from "./components/LoadingGame/LoadingGame";
import { WordDefinition } from "./types";
import AppContextProvider from "./context";
import { AppContext } from "./context";

//TODO: on mobile, stop mobile keyboard from popping up for input

function App() {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [wordMeaning, setWordMeaning] = useState<WordDefinition>({
    isDef: false,
    def: {},
  });
  const { currentRow, setCurrentRow, currentColumn, setCurrentColumn } =
    useContext(AppContext);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  });

  const handleKeyEvent = (event: KeyboardEvent) => {
    if (!isResultsOpen && !isStatisticsOpen && !isHowToPlayOpen && !isLoading) {
      const inputElement: HTMLElement | null = document.getElementById(
        `${currentRow},${currentColumn}`
      );
      (inputElement as HTMLInputElement).focus();
      if (event.key === "Backspace") {
        if (
          (inputElement as HTMLInputElement).value.length == 0 &&
          currentColumn != 0
        ) {
          setCurrentColumn(currentColumn - 1);
          const prevElement: any = document.getElementById(
            `${currentRow},${currentColumn - 1}`
          );
          prevElement.value = "";
        } else {
          (inputElement as HTMLInputElement).value = "";
        }
      } else if (event.key === "Enter") {
        if (!checkInputWord()) {
          return;
        }
        if (currentRow != 4) {
          setCurrentRow(currentRow + 1);
          setCurrentColumn(0);
          window.setTimeout(
            () => document.getElementById(`${currentRow + 1},0`)?.focus(),
            0
          );
        }
      } else if (event.keyCode > 64 && event.keyCode < 91) {
        if (inputElement) {
          (inputElement as HTMLInputElement).value = event.key;
        }
        if (currentColumn != 4) {
          setCurrentColumn(currentColumn + 1);
        }
      }
    }
  };

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

  const getRandomWord = async () => {
    fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //TODO: have to check that it has a definition, otherwise retry (need loading state)
        setRandomWord(data[0]);
      })
      .catch((error) => {
        //TODO: retry (need loading state), otherwise let user know that couldn't fetch word
        console.error(error);
      });
  };

  const getWordDefinition = async (wordToCheck: string) => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`)
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
  };

  const checkInputWord = () => {
    //TODO: get all the letters from the current row, check if its the solution
    //if yes, it is solved
    //if no, check if it has a definition
    //if it doesnt, it is considered not a valid word, we have to let the user know
    //if it does, its a valid word, we can color the tiles and keyboard accordingly and proceed to the next row
    return true;
  };

  useEffect(() => {
    //TODO: init here
    //loading until we get a word that has a definition
    //stop loading state, ready to play
  }, []);

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
      {isLoading && <LoadingGame />}
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
