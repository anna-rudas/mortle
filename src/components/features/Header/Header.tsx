import React from "react";
import QuestionMarkIcon from "../../../assets/icons/QuestionMarkIcon";
import StatsIcon from "../../../assets/icons/StatsIcon";

interface HeaderProps {
  openHowToPlay: () => void;
  openStatistics: () => void;
}

function Header({ openHowToPlay, openStatistics }: HeaderProps) {
  return (
    <div className="header-con">
      <div className="header">
        <button className="btn-header" onClick={openHowToPlay}>
          <QuestionMarkIcon />
        </button>
        <a href="." className="header-title">
          Mortle
        </a>
        <button className="btn-header" onClick={openStatistics}>
          <StatsIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
