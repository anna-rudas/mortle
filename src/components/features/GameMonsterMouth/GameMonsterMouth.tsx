import React, { useContext } from "react";
import { AppContext } from "../../../context/context";
import { className } from "../../../utilities/helpers";
import { LetterColorClass } from "../../../types/types";

function GameMonsterMouth() {
  const { currentRow, inputLetters, lastDoneRow, compareInputAndSolution } =
    useContext(AppContext);

  const colorInputLetter = (
    rowIndex: number,
    columnIndex: number
  ): LetterColorClass | null => {
    if (lastDoneRow <= rowIndex) {
      return null;
    }
    const coloring = compareInputAndSolution(rowIndex);
    return coloring[columnIndex];
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
                    {...className(
                      "game-tooth-con",
                      colorInputLetter(rowIndex, columnIndex)
                    )}
                    key={columnIndex}
                  >
                    <input
                      className="text-input-small game-tooth-input"
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
