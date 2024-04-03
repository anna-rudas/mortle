import React, { useEffect, useContext, useState } from "react";
import { createRoot } from "react-dom/client";
import Background from "./components/Background/Background";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import HowToPlay from "./components/HowToPlay/HowToPlay";
import Statistics from "./components/Statistics/Statistics";
import GameResult from "./components/GameResult/GameResult";
import LoadingGame from "./components/LoadingGame/LoadingGame";
import AppContextProvider, { AppContext } from "./context";
import { dummyResultsData } from "./test/test-data";
import { wordLength, numberOfTries } from "./constants";
import { checkInputWord, getWordDefinitionTest } from "./helpers";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { WordDefinition } from "./types";

function App() {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { showBoundary } = useErrorBoundary();

  const {
    currentRow,
    setCurrentRow,
    currentColumn,
    setCurrentColumn,
    inputLetters,
    setInputLetterValue,
    solutionWordDef,
    setSolutionWordDef,
    lastDoneRow,
    setLastDoneRow,
  } = useContext(AppContext);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  });

  const handleKeyEvent = async (event: KeyboardEvent) => {
    if (!isResultsOpen && !isStatisticsOpen && !isHowToPlayOpen && !isLoading) {
      if (currentRow < numberOfTries) {
        if (event.key === "Backspace") {
          if (
            inputLetters[currentRow][currentColumn] === "" &&
            currentColumn != 0
          ) {
            setInputLetterValue("", true);
            setCurrentColumn(currentColumn - 1);
          } else {
            setInputLetterValue("");
          }
        } else if (event.key === "Enter") {
          //TODO: disable input while await
          const isInputWordValid = await checkInputWord(
            currentRow,
            inputLetters,
            solutionWordDef
          );
          if (!isInputWordValid) {
            return;
          }

          setLastDoneRow(lastDoneRow + 1);
          setCurrentRow(currentRow + 1);
          setCurrentColumn(0);
        } else if (event.key.length == 1) {
          setInputLetterValue(event.key.toLocaleUpperCase());
          if (currentColumn != wordLength - 1) {
            setCurrentColumn(currentColumn + 1);
          }
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
  // const openGameResult = () => {
  //   setIsResultsOpen(true);
  // };
  const closeGameResult = () => {
    setIsResultsOpen(false);
  };

  // const getRandomWord = (): Promise<string> => {
  //   return fetch("https://random-word-api.herokuapp.com/word?length=5")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //setRandomWord(data[0]);
  //       return data[0];
  //     })
  //     .catch((error) => {
  //       showBoundary(error);
  //     });
  // };

  // const getWordDefinition = (
  //   wordToCheck: string
  // ): Promise<WordDefinition | null> => {
  //   return fetch(
  //     `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => data[0] || null)
  //     .catch((error) => {
  //       showBoundary(error);
  //     });
  // };

  const getSolutionWithDefinition = async () => {
    const loopMax = 10;
    let loopCounter = 0;

    while (loopCounter < loopMax) {
      loopCounter++;

      //real data
      // const randomWord: string = await getRandomWord();
      // const randomWordDef: WordDefinition | null = await getWordDefinition(
      //   randomWord
      // );

      //test data
      const randomWordDef = getWordDefinitionTest();

      if (randomWordDef) {
        setSolutionWordDef(randomWordDef);
        return;
      }
    }

    showBoundary("Could not get solution word.");
  };

  useEffect(() => {
    getSolutionWithDefinition().then(() => setIsLoading(false));
  }, []);

  return (
    <div className="wrapper">
      <Background />
      <div className="game-content">
        <Header openHowToPlay={openHowToPlay} openStatistics={openStatistics} />
        {!isLoading && <Game />}
        {isHowToPlayOpen && <HowToPlay closeHowToPlay={closeHowToPlay} />}
        {isStatisticsOpen && <Statistics closeStatistics={closeStatistics} />}
      </div>
      {isResultsOpen && solutionWordDef && (
        <GameResult
          wordDefinition={solutionWordDef}
          guessedAtData={dummyResultsData}
          closeGameResult={closeGameResult}
        />
      )}
      {isLoading && <LoadingGame />}
    </div>
  );
}

const logError = (error: Error) => {
  console.error("Unexpected error: ", error);
};

function AppWithProvider() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onError={logError}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ErrorBoundary>
  );
}

export default AppWithProvider;

createRoot(document.getElementById("root")!).render(<AppWithProvider />);
