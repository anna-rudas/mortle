import React, { useContext } from "react";
import {
  keyboardLetters,
  wordLength,
  numberOfTries,
  letterColoringClasses,
} from "../../../data/constants";
import { AppContext } from "../../../context/context";
import { className } from "../../../utilities/helpers";
import { LetterColorClass } from "../../../types/types";

function KeyboardMonsterMouth() {
  const {
    currentRow,
    setCurrentRow,
    currentColumn,
    setCurrentColumn,
    inputLetters,
    setInputLetterValue,
    isInputWordValid,
    compareInputAndSolution,
    setIsFetching,
  } = useContext(AppContext);

  const handleClickInputs = async (
    rowIndex: number,
    letterIndex: number,
    currentLetter: string | JSX.Element
  ) => {
    if (currentRow < numberOfTries) {
      if (rowIndex === 2 && letterIndex === 0) {
        //clicked enter
        setIsFetching(true);
        const isInputWordValidResult = await isInputWordValid(currentRow);
        setIsFetching(false);
        if (!isInputWordValidResult) {
          return;
        }

        setCurrentRow(currentRow + 1);
        setCurrentColumn(0);
      } else if (rowIndex === 2 && letterIndex === 8) {
        //clicked backspace
        if (
          inputLetters[currentRow][currentColumn] === "" &&
          currentColumn !== 0
        ) {
          setInputLetterValue("", true);
          setCurrentColumn(currentColumn - 1);
        } else {
          setInputLetterValue("");
        }
      } else if (typeof currentLetter === "string") {
        //clicked letter
        setInputLetterValue(currentLetter);
        if (currentColumn !== wordLength - 1) {
          setCurrentColumn(currentColumn + 1);
        }
      }
    }
  };

  const colorKeyboardLetter = (
    currentLetter: string | JSX.Element
  ): LetterColorClass | null => {
    if (typeof currentLetter === "string") {
      //order of colors: correct, wrong, no
      for (const colorClass of letterColoringClasses) {
        for (let i = currentRow - 1; i >= 0; i--) {
          if (!inputLetters[i].includes(currentLetter)) {
            //if letter not in current row, skip
            continue;
          }

          const colorClassResults = compareInputAndSolution(i);

          //if the same color and same letter
          if (
            colorClassResults.some(
              (currentColorClass, classIdx) =>
                currentColorClass === colorClass &&
                inputLetters[i][classIdx] === currentLetter
            )
          ) {
            return colorClass;
          }
        }
      }
    }
    return null;
  };

  return (
    <div className="keyboard-monster-mouth-container">
      <div className="keyboard-monster-teeth-container">
        {keyboardLetters.map((currentRow, currentRowIndex) => {
          return (
            <div key={currentRowIndex} className="keyboard-monster-teeth-row">
              {currentRow.map((currentLetter, currentLetterIndex) => {
                return (
                  <div
                    key={currentLetterIndex}
                    {...className(
                      "keyboard-monster-tooth-container",
                      colorKeyboardLetter(currentLetter)
                    )}
                  >
                    <button
                      onClick={() =>
                        handleClickInputs(
                          currentRowIndex,
                          currentLetterIndex,
                          currentLetter
                        )
                      }
                      className="text-input-small keyboard-monster-tooth-button"
                    >
                      {currentLetter}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KeyboardMonsterMouth;
