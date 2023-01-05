import React from "react";
import QuestionMarkIcon from "../../icons/QuestionMarkIcon";
import StatsIcon from "../../icons/StatsIcon";

function Header() {
  return (
    <div className="header-con">
      <div className="header">
        <button className="btn-header">
          <QuestionMarkIcon />
        </button>
        <a href="." className="title">
          Wordle
        </a>
        <button className="btn-header">
          <StatsIcon />
        </button>
      </div>
    </div>
  );
}

export default Header;
