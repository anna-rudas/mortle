import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../context/context";
import Background from "../../features/Background/Background";
import Game from "../../features/Game/Game";
import Header from "../../features/Header/Header";
import HowToPlay from "../../modals/HowToPlay/HowToPlay";
import Statistics from "../../modals/Statistics/Statistics";
import GameResult from "../../modals/GameResult/GameResult";
import LoadingGame from "../../loaders/LoadingGame/LoadingGame";
import WarningModal from "../../modals/WarningModal/WarningModal";
import ErrorModal from "../../modals/ErrorModal/ErrorModal";
import LoadingSecondary from "../../loaders/LoadingSecondary/LoadingSecondary";
import {
  generalErrorMsg,
  invalidSubmitWarning,
  wordLength,
  numberOfTries,
} from "../../../data/constants";

function MainPage() {
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

export default MainPage;