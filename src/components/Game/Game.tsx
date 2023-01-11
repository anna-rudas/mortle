import React from "react";
import MonsterEyes from "../MonsterEyes/MonsterEyes";

function Game() {
  return (
    <div className="game-con">
      <MonsterEyes duration="slow" />
      <MonsterEyes duration="fast" />
    </div>
  );
}

export default Game;
