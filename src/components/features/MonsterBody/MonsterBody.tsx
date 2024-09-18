import React from "react";
import MonsterEyes from "../../templates/MonsterEyes/MonsterEyes";
import MonsterFeet from "../../templates/MonsterFeet/MonsterFeet";
import KeyboardMonsterMouth from "../KeyboardMonsterMouth/KeyboardMonsterMouth";
import GameMonsterMouth from "../GameMonsterMouth/GameMonsterMouth";

interface MonsterBodyProps {
  monsterType: "game" | "keyboard";
}

function MonsterBody({ monsterType }: MonsterBodyProps) {
  return (
    <div className={`${monsterType}-monster-body-con`}>
      <div className={`${monsterType}-monster-face`}>
        <MonsterEyes monsterType={monsterType} />
        {monsterType === "game" ? (
          <GameMonsterMouth />
        ) : (
          <KeyboardMonsterMouth />
        )}
      </div>
      <MonsterFeet monsterType={monsterType} />
    </div>
  );
}

export default MonsterBody;
