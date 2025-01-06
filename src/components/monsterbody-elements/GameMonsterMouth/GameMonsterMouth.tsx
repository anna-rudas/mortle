import { useContext } from "react";
import { AppContext } from "../../../context/context";
import { className } from "../../../utilities/helpers";
import { LetterColorClass } from "../../../types/types";

function GameMonsterMouth() {
  const { currentRow, inputLetters, compareInputAndSolution } =
    useContext(AppContext);

  const colorInputLetter = (
    rowIndex: number,
    columnIndex: number
  ): LetterColorClass | null => {
    if (currentRow <= rowIndex) {
      return null;
    }
    const coloring = compareInputAndSolution(rowIndex);
    return coloring[columnIndex];
  };

  return (
    <div className="game-monster-mouth-container">
      <div className="game-monster-teeth-container">
        {inputLetters.map((currRow, rowIndex) => {
          return (
            <div key={rowIndex} className="game-monster-teeth-row">
              {currRow.map((currLetter, columnIndex) => {
                return (
                  <div
                    {...className(
                      "game-monster-tooth-container",
                      colorInputLetter(rowIndex, columnIndex)
                    )}
                    key={columnIndex}
                  >
                    <input
                      data-testid="toothInput"
                      className="text-input-small game-monster-tooth-input"
                      type="text"
                      maxLength={1}
                      autoComplete="off"
                      disabled={currentRow !== rowIndex}
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
