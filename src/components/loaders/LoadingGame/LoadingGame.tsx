import MonsterFeet from "../../monsterbody-elements/MonsterFeet/MonsterFeet";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";

export default function LoadingGame() {
  return (
    <ModalContainer modalTitle="Loading">
      <div className="loading-game-container">
        <div className="little-game-monster-container">
          <div className="little-game-monster"></div>
          <MonsterFeet monsterType="game" size="small" />
        </div>
        <div className="little-keyboard-monster-container">
          <div className="little-keyboard-monster"></div>
          <MonsterFeet monsterType="keyboard" size="small" />
        </div>
      </div>
    </ModalContainer>
  );
}
