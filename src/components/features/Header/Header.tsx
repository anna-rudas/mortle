import React from "react";
import QuestionMarkIcon from "../../../assets/icons/QuestionMarkIcon";
import StatsIcon from "../../../assets/icons/StatsIcon";

interface HeaderProps {
  openHowToPlay: () => void;
  openStatistics: () => void;
}

function Header({ openHowToPlay, openStatistics }: HeaderProps) {
  return (
    <div className="header-container">
      <div className="header-content">
        <button className="header-button" onClick={openHowToPlay}>
          <QuestionMarkIcon />
        </button>
        <a href="." className="text-game-title">
          Mortle
        </a>
        <button className="header-button" onClick={openStatistics}>
          <StatsIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
