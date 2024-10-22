import { useContext } from "react";
import { AppContext } from "../../../context/context";

interface MonsterEyesProps {
  monsterType: "game" | "keyboard";
  numberOfEyes?: number;
}

function MonsterEyes({
  monsterType = "game",
  numberOfEyes = 2,
}: MonsterEyesProps) {
  const { isGameOver, statistics } = useContext(AppContext);

  const numberOfEyesHelper = new Array(numberOfEyes).fill(0);

  const monsterEyesClass = (): string => {
    const currentGameResult = statistics.at(-1);

    if (currentGameResult) {
      if (isGameOver && currentGameResult.guessed) {
        return "eyes-happy";
      }
      if (isGameOver && !currentGameResult.guessed) {
        return "eyes-sad";
      }
    }
    return "eye-border";
  };

  return (
    <div className="eyes-container">
      {numberOfEyesHelper.map((current, index) => {
        return (
          <div key={index} className={monsterEyesClass()}>
            <div className={`eye-ball-${monsterType}`}></div>
          </div>
        );
      })}
    </div>
  );
}

export default MonsterEyes;
