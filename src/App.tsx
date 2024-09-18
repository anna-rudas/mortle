import React, { useEffect, useContext, useState } from "react";
import { createRoot } from "react-dom/client";
import Background from "./components/Background/Background";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import HowToPlay from "./components/HowToPlay/HowToPlay";
import Statistics from "./components/Statistics/Statistics";
import GameResult from "./components/GameResult/GameResult";
import LoadingGame from "./components/LoadingGame/LoadingGame";
import AppContextProvider, { AppContext } from "./context/context";
import {
  wordLength,
  numberOfTries,
  generalErrorMsg,
  invalidSubmitWarning,
} from "./data/constants";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import WarningModal from "./components/WarningModal/WarningModal";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import LoadingSecondary from "./components/LoadingSecondary/LoadingSecondary";

function App() {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);

  const {
    currentRow,
    setCurrentRow,
    currentColumn,
    setCurrentColumn,
    inputLetters,
    setInputLetterValue,
    solutionWordDef,
    lastDoneRow,
    setLastDoneRow,
    checkInputWord,
    isFetching,
    setIsFetching,
    isWordInvalidWarning,
    isGameOver,
    isLoading,
    resetGame,
  } = useContext(AppContext);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  });

  const handleKeyEvent = async (event: KeyboardEvent) => {
    if (
      !isGameOver &&
      !isStatisticsOpen &&
      !isHowToPlayOpen &&
      !isLoading &&
      !isFetching &&
      !isWordInvalidWarning
    ) {
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
          setIsFetching(true);
          const isInputWordValid = await checkInputWord(currentRow);
          setIsFetching(false);
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

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="wrapper">
      <Background />
      <div className="game-content">
        <Header openHowToPlay={openHowToPlay} openStatistics={openStatistics} />
        {!isLoading && solutionWordDef?.word != "undefined" && <Game />}
        {isHowToPlayOpen && <HowToPlay closeHowToPlay={closeHowToPlay} />}
        {isStatisticsOpen && <Statistics closeStatistics={closeStatistics} />}
      </div>
      {isGameOver && <GameResult />}
      {isLoading && <LoadingGame />}
      {isWordInvalidWarning && (
        <WarningModal warningMsg={invalidSubmitWarning} />
      )}
      {((!isLoading && solutionWordDef?.word == "undefined") ||
        (!isLoading && !solutionWordDef)) && (
        <ErrorModal errorMsg={generalErrorMsg} />
      )}
      {isFetching && <LoadingSecondary />}
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
