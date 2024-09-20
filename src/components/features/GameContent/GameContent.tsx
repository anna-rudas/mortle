import React from "react";
import MonsterBody from "../MonsterBody/MonsterBody";

function GameContent() {
  return (
    <div className="game-container">
      <MonsterBody monsterType="game" />
      <MonsterBody monsterType="keyboard" />
    </div>
  );
}

export default GameContent;
