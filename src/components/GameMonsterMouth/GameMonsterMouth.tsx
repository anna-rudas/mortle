import React from "react";

const columns = new Array(5);
const rows = new Array(5);
columns.fill(0);
rows.fill(0);

function GameMonsterMouth() {
  return (
    <div className="monster-mouth">
      <div className="teeth-con">
        {rows.map((currentRow, index) => {
          return (
            <div key={index} className="row">
              {columns.map((currentColumn, index) => {
                return (
                  <div className="game-teeth-con" key={index}>
                    <input
                      className="game-teeth-input"
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
