import React, { useContext } from "react";
import QuestionMarkIcon from "../../../assets/icons/QuestionMarkIcon";
import StatsIcon from "../../../assets/icons/StatsIcon";
import { AppContext } from "../../../context/context";

function Header() {
  const { setIsStatisticsModalOpen, setIsHowToPlayModalOpen } =
    useContext(AppContext);

  return (
    <div className="header-container">
      <div className="header-content">
        <button
          className="header-button"
          onClick={() => {
            setIsHowToPlayModalOpen(true);
          }}
        >
          <QuestionMarkIcon />
        </button>
        <a href="." className="text-game-title">
          Mortle
        </a>
        <button
          className="header-button"
          onClick={() => {
            setIsStatisticsModalOpen(true);
          }}
        >
          <StatsIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
