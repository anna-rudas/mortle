import MonsterEyes from "../../monsterbody-elements/MonsterEyes/MonsterEyes";
import MonsterFeet from "../../monsterbody-elements/MonsterFeet/MonsterFeet";
import KeyboardMonsterMouth from "../../monsterbody-elements/KeyboardMonsterMouth/KeyboardMonsterMouth";
import GameMonsterMouth from "../../monsterbody-elements/GameMonsterMouth/GameMonsterMouth";

interface MonsterBodyProps {
  monsterType: "game" | "keyboard";
}

function MonsterBody({ monsterType }: MonsterBodyProps) {
  return (
    <div className={`${monsterType}-monster-body-container`}>
      <div className={`${monsterType}-monster-face`}>
        <MonsterEyes
          monsterType={monsterType}
          numberOfEyes={monsterType === "keyboard" ? 3 : 2}
        />
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
