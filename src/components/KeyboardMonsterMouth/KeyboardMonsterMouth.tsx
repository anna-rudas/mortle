import React, { useContext } from "react";
import {
  keyboardLetters,
  wordLength,
  numberOfTries,
  letterColoringClasses,
} from "../../constants";
import { AppContext } from "../../context";
import { checkInputWord, compareInputAndSolution } from "../../helpers";

function KeyboardMonsterMouth() {
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
  } = useContext(AppContext);

  const handleClickInputs = async (
    rowIndex: number,
    letterIndex: number,
    currentLetter: string | JSX.Element
  ) => {
    if (currentRow < numberOfTries) {
      if (rowIndex === 2 && letterIndex === 0) {
        //clicked enter
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
      } else if (rowIndex === 2 && letterIndex === 8) {
        //clicked backspace
        if (
          inputLetters[currentRow][currentColumn] === "" &&
          currentColumn != 0
        ) {
          setInputLetterValue("", true);
          setCurrentColumn(currentColumn - 1);
        } else {
          setInputLetterValue("");
        }
      } else if (typeof currentLetter == "string") {
        //clicked letter
        setInputLetterValue(currentLetter);
        if (currentColumn != wordLength - 1) {
          setCurrentColumn(currentColumn + 1);
        }
      }
    }
  };

  const colorKeyboardLetter = (currentLetter: string | JSX.Element) => {
    //TODO add comments

    if (typeof currentLetter == "string") {
      for (const colorClass of letterColoringClasses) {
        for (let i = lastDoneRow - 1; i >= 0; i--) {
          if (!inputLetters[i].includes(currentLetter)) {
            continue;
          }

          const colorClassResults = compareInputAndSolution(
            i,
            inputLetters,
            solutionWordDef
          );

          if (
            colorClassResults.some(
              (currentColorClass, classIdx) =>
                currentColorClass == colorClass &&
                inputLetters[i][classIdx] == currentLetter
            )
          ) {
            return colorClass;
          }
        }
      }
    }
  };

  return (
    <div className="keyboard-monster-mouth">
      <div className="keyboard-teeth-con">
        {keyboardLetters.map((currentRow, currentRowIndex) => {
          return (
            <div key={currentRowIndex} className="keyboard-teeth-row">
              {currentRow.map((currentLetter, currentLetterIndex) => {
                return (
                  <div
                    key={currentLetterIndex}
                    className={[
                      "keyboard-tooth-con",
                      colorKeyboardLetter(currentLetter),
                    ].join(" ")}
                  >
                    <button
                      onClick={() =>
                        handleClickInputs(
                          currentRowIndex,
                          currentLetterIndex,
                          currentLetter
                        )
                      }
                      className="keyboard-tooth-btn"
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
