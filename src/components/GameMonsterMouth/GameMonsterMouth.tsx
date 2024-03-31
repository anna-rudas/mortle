import React, { useContext } from "react";
import { AppContext } from "../../context";
import { compareInputAndSolution } from "../../helpers";

function GameMonsterMouth() {
  const { currentRow, inputLetters, solutionWordDef, lastDoneRow } =
    useContext(AppContext);

  const colorInputLetter = (rowIndex: number, columnIndex: number) => {
    if (lastDoneRow > rowIndex) {
      const coloring = compareInputAndSolution(
        rowIndex,
        inputLetters,
        solutionWordDef
      );
      return coloring[columnIndex];
    }
    return "";
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
