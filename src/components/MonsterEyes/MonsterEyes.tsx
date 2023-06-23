import React from "react";

interface MonsterEyesProps {
  monsterType: "game" | "keyboard";
}

function MonsterEyes({ monsterType }: MonsterEyesProps) {
  return (
    <div className="eyes-con">
      <div className="eye-border">
        <div className={`eye-ball-${monsterType}`}></div>
      </div>
      <div className="eye-border">
        <div className={`eye-ball-${monsterType}`}></div>
      </div>
    </div>
  );
}

export default MonsterEyes;
