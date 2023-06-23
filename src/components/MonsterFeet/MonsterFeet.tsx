import React from "react";

interface MonsterFeetProps {
  monsterType: "game" | "keyboard";
}

function MonsterFeet({ monsterType }: MonsterFeetProps) {
  return (
    <div className="feet-con">
      <div className="foot">
        <div className={`${monsterType}-left-vertical-part`}></div>
        <div className={`${monsterType}-left-horizontal-part`}></div>
      </div>
      <div className="foot">
        <div className={`${monsterType}-right-vertical-part`}></div>
        <div className={`${monsterType}-right-horizontal-part`}></div>
      </div>
    </div>
  );
}

export default MonsterFeet;
