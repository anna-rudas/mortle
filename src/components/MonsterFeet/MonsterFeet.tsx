import React from "react";

interface MonsterFeetProps {
  monsterType: "game" | "keyboard";
}

function MonsterFeet({ monsterType }: MonsterFeetProps) {
  return (
    <div className="feet-con">
      <div className="foot">
        <div className={`left-vertical-part ${monsterType}-monster-bg`}></div>
        <div className={`left-horizontal-part ${monsterType}-monster-bg`}></div>
      </div>
      <div className="foot">
        <div className={`right-vertical-part ${monsterType}-monster-bg`}></div>
        <div
          className={`right-horizontal-part ${monsterType}-monster-bg`}
        ></div>
      </div>
    </div>
  );
}

export default MonsterFeet;
