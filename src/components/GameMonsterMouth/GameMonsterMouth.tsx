import React, { useContext } from "react";
import { AppContext } from "../../context";

function GameMonsterMouth() {
  const { currentRow, setCurrentRow } = useContext(AppContext);

  const columns = new Array(5);
  const rows = new Array(5);
  columns.fill(0);
  rows.fill(0);

  const handleInputs = (event: any, rowIndex: any, columnIndex: any) => {
    event.preventDefault();

    if (event.key === "Backspace") {
      if (event.target.value.length === 0) {
        document.getElementById(`${currentRow},${columnIndex - 1}`)?.focus();
      } else if (event.target.value.length === 1) {
        event.target.value = "";
      }
    } else if (event.key === "Enter") {
      setCurrentRow(currentRow + 1);
      window.setTimeout(
        () => document.getElementById(`${currentRow + 1},0`)?.focus(),
        0
      );
    } else if (
      currentRow === rowIndex &&
      event.key.length === 1 &&
      event.key.match(/[a-z]/i)
    ) {
      event.target.value = event.key;
      document.getElementById(`${currentRow},${columnIndex + 1}`)?.focus();
    }
  };

  return (
    <div className="game-monster-mouth">
      <div className="game-teeth-con">
        {rows.map((currRow, rowIndex) => {
          return (
            <div key={rowIndex} className="game-teeth-row">
              {columns.map((currColumn, columnIndex) => {
                return (
                  <div className="game-tooth-con" key={columnIndex}>
                    <input
                      id={`${rowIndex},${columnIndex}`}
                      onKeyDown={(event) =>
                        handleInputs(event, rowIndex, columnIndex)
                      }
                      className={`${
                        currentRow === rowIndex
                          ? "game-tooth-input input-enabled"
                          : "game-tooth-input input-disabled"
                      }`}
                      type="text"
                      maxLength={1}
                      autoComplete="off"
                      autoFocus={columnIndex === 0 && rowIndex === 0}
                      disabled={currentRow != rowIndex}
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
