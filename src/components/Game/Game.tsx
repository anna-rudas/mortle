import React from "react";
import MonsterFeet from "../MonsterFeet/MonsterFeet";

function Game() {
  return (
    <div className="game-con">
      <MonsterFeet monsterType="game" />
      <MonsterFeet monsterType="keyboard" />
    </div>
  );
}

export default Game;
