import React from "react";

const columns = new Array(5);
const rows = new Array(5);
columns.fill(0);
rows.fill(0);

function GameMonsterMouth() {
  return (
    <div className="game-monster-mouth">
      <div className="game-teeth-con">
        {rows.map((currentRow, index) => {
          return (
            <div key={index} className="teeth-row">
              {columns.map((currentColumn, index) => {
                return (
                  <div className="game-tooth-con" key={index}>
                    <input
                      className="game-tooth-input"
                      type="text"
                      maxLength={1}
                      autoComplete="off"
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
