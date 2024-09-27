import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../context/context";
import GameResultModal from "../../modals/GameResultModal/GameResultModal";
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
import PageWrapper from "../../templates/PageWrapper/PageWrapper";
import GameContent from "../../features/GameContent/GameContent";

function MainPage() {
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
    isStatisticsModalOpen,
    isHowToPlayModalOpen,
  } = useContext(AppContext);

  const handleKeyEvent = async (event: KeyboardEvent) => {
    if (
      !isGameOver &&
      !isStatisticsModalOpen &&
      !isHowToPlayModalOpen &&
      !isLoading &&
      !isFetching &&
      !isWordInvalidWarning
    ) {
      if (currentRow < numberOfTries) {
        //check key is not space
        if (event.key != " ") {
          if (event.key === "Backspace") {
            if (
              inputLetters[currentRow][currentColumn] === "" &&
              currentColumn !== 0
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
          } else if (event.key.length === 1) {
            setInputLetterValue(event.key.toLocaleUpperCase());
            if (currentColumn !== wordLength - 1) {
              setCurrentColumn(currentColumn + 1);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  });

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <PageWrapper>
      <>
        <GameContent />
        {isGameOver && <GameResultModal />}
        {isLoading && <LoadingGame />}
        {isWordInvalidWarning && (
          <WarningModal warningMsg={invalidSubmitWarning} />
        )}
        {((!isLoading && solutionWordDef?.word === "undefined") ||
          (!isLoading && !solutionWordDef)) && (
          <ErrorModal errorMsg={generalErrorMsg} />
        )}
        {isFetching && <LoadingSecondary />}
      </>
    </PageWrapper>
  );
}

export default MainPage;
