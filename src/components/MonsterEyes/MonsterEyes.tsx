import React from "react";

interface MonsterEyesProps {
  duration: "slow" | "fast";
}

function MonsterEyes({ duration }: MonsterEyesProps) {
  return (
    <div className="eyes-con">
      <div className="eye-border">
        <div className={`eye-ball-${duration}`}></div>
      </div>
      <div className="eye-border">
        <div className={`eye-ball-${duration}`}></div>
      </div>
    </div>
  );
}

export default MonsterEyes;
