import React, { useContext } from "react";
import { AppContext } from "../../../context/context";

interface MonsterEyesProps {
  monsterType: "game" | "keyboard";
  numberOfEyes: number;
}

const defaultProps: MonsterEyesProps = {
  monsterType: "game",
  numberOfEyes: 2,
};

function MonsterEyes({ monsterType, numberOfEyes }: MonsterEyesProps) {
  const { isGameOver, currentGameResultsData } = useContext(AppContext);

  const numberOfEyesHelper = new Array(numberOfEyes).fill(0);

  const monsterEyesClass = (): string => {
    if (isGameOver && currentGameResultsData.guessed) {
      return "eyes-happy";
    } else if (isGameOver && !currentGameResultsData.guessed) {
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

MonsterEyes.defaultProps = defaultProps;

export default MonsterEyes;
