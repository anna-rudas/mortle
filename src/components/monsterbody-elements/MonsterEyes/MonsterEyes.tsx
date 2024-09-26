import React, { useContext } from "react";
import { AppContext } from "../../../context/context";

interface MonsterEyesProps {
  monsterType: "game" | "keyboard";
  numberOfEyes?: number;
}

function MonsterEyes({
  monsterType = "game",
  numberOfEyes = 2,
}: MonsterEyesProps) {
  const { isGameOver, currentGameResultsData } = useContext(AppContext);

  const numberOfEyesHelper = new Array(numberOfEyes).fill(0);

  const monsterEyesClass = (): string => {
    if (isGameOver && currentGameResultsData.guessed) {
      return "eyes-happy";
    }
    if (isGameOver && !currentGameResultsData.guessed) {
      return "eyes-sad";
    }
    return "eye-border";
  };

  return (
    <div className="eyes-container">
      {numberOfEyesHelper.map((curr, idx) => {
        return (
          <div key={idx} className={monsterEyesClass()}>
            <div className={`eye-ball-${monsterType}`}></div>
          </div>
        );
      })}
    </div>
  );
}

export default MonsterEyes;
