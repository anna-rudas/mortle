import React from "react";

interface MonsterFeetProps {
  monsterType: "game" | "keyboard";
  size?: "large" | "small";
}

function MonsterFeet({ monsterType, size }: MonsterFeetProps) {
  return (
    <div className={`feet-container-${size}`}>
      <div className={`foot-${size}`}>
        <div className={`${monsterType}-left-vertical-part`}></div>
        <div className={`${monsterType}-left-horizontal-part`}></div>
      </div>
      <div className={`foot-${size}`}>
        <div className={`${monsterType}-right-vertical-part`}></div>
        <div className={`${monsterType}-right-horizontal-part`}></div>
      </div>
    </div>
  );
}

MonsterFeet.defaultProps = {
  size: "large",
};

export default MonsterFeet;
