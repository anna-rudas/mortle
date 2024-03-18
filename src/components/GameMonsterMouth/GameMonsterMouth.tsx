import React, { useContext } from "react";
import { AppContext } from "../../context";

function GameMonsterMouth() {
  const { currentRow, inputLetters, solutionWordDef, lastDoneRow } =
    useContext(AppContext);

  const compareInputAndSolution = (rowIndex: number) => {
    const inputWord = inputLetters[rowIndex];
    const solutionWord = solutionWordDef?.word;

    const rowLettersColoring: string[] = [];

    inputWord.forEach((inputLetter, inputLetterIndex) => {
      if (solutionWord && solutionWord.indexOf(inputLetter) < 0) {
        rowLettersColoring.push("letter-no");
      } else if (
        solutionWord &&
        solutionWord[inputLetterIndex] == inputLetter
      ) {
        rowLettersColoring.push("letter-correct");
      } else if (solutionWord) {
        const timesInSolution = solutionWord.split(inputLetter).length - 1;

        const incorrectIndexes = [];
        let correctTimes = 0;

        for (let j = 0; j < inputWord.length; j++) {
          if (inputWord[j] === inputLetter) {
            if (inputWord[j] === solutionWord[j]) {
              correctTimes++;
            } else {
              incorrectIndexes.push(j);
            }
          }
        }
        const yellowTimes = timesInSolution - correctTimes;

        for (let j = 0; j < incorrectIndexes.length; j++) {
          if (inputLetterIndex === incorrectIndexes[j]) {
            if (j < yellowTimes) {
              rowLettersColoring.push("letter-wrong");
            } else {
              rowLettersColoring.push("letter-no");
            }
          }
        }
      }
    });
    return rowLettersColoring;
  };

  const colorInputLetter = (rowIndex: number, columnIndex: number) => {
    if (lastDoneRow > rowIndex) {
      const coloring = compareInputAndSolution(rowIndex);
      return coloring[columnIndex];
    } else return "";
  };

  return (
    <div className="game-monster-mouth">
      <div className="game-teeth-con">
        {inputLetters.map((currRow, rowIndex) => {
          return (
            <div key={rowIndex} className="game-teeth-row">
              {currRow.map((currLetter, columnIndex) => {
                return (
                  <div
                    className={
                      "game-tooth-con " +
                      colorInputLetter(rowIndex, columnIndex)
                    }
                    key={columnIndex}
                  >
                    <input
                      className="game-tooth-input"
                      type="text"
                      maxLength={1}
                      autoComplete="off"
                      disabled={currentRow != rowIndex}
                      value={currLetter}
                      readOnly
                    ></input>
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

export default GameMonsterMouth;
