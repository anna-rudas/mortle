import React from "react";
import MonsterFeet from "../MonsterFeet/MonsterFeet";
import MonsterBody from "../MonsterBody/MonsterBody";

function Game() {
  return (
    <div className="game-con">
      <MonsterBody monsterType="game" />
      <MonsterBody monsterType="keyboard" />
    </div>
  );
}

export default Game;
