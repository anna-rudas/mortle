import React from "react";
import MonsterFeet from "../MonsterFeet/MonsterFeet";

export default function LoadingGame() {
  return (
    <div className="modal-con">
      <div className="modal-content-loading">
        <h2 className="modal-title">Loading</h2>
        <div className="little-monsters-con">
          <div className="little-game-monster-con">
            <div className="little-game-monster"></div>
            <MonsterFeet monsterType="game" size="small" />
          </div>
          <div className="little-keyboard-monster-con">
            <div className="little-keyboard-monster"></div>
            <MonsterFeet monsterType="keyboard" size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}
