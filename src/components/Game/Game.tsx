import React from "react";
import MonsterBody from "../MonsterBody/MonsterBody";

//TODO: stop eye and leg animations when game over
//TODO: change eye and leg animations when win/lose

function Game() {
  return (
    <div className="game-con">
      <MonsterBody monsterType="game" />
      <MonsterBody monsterType="keyboard" />
    </div>
  );
}

export default Game;
