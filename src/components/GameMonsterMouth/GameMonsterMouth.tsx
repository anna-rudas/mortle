import React, { useContext } from "react";
import { AppContext } from "../../context";

function GameMonsterMouth() {
  const { currentRow } = useContext(AppContext);

  const columns = new Array(5);
  const rows = new Array(5);
  columns.fill(0);
  rows.fill(0);

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
                      className="game-tooth-input"
                      type="text"
                      maxLength={1}
                      autoComplete="off"
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
