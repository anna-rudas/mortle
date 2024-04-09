import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "../../icons/CloseIcon";
import ArrowIcon from "../../icons/ArrowIcon";
import { resultTexts } from "../../constants";
import { AppContext } from "../../context";

function GameResult() {
  const [isReview, setIsReview] = useState(false);

  const { solutionWordDef, currentGameResultsData, resetGame } =
    useContext(AppContext);

  const toggleReview = () => {
    setIsReview(!isReview);
  };

  const resultReactionText = () => {
    const max = 4;
    const min = 0;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!currentGameResultsData.guessed) {
      return resultTexts.lose[randomIndex];
    } else {
      if (currentGameResultsData.guessedAt == 1) {
        return resultTexts.winFirst[randomIndex];
      } else if (currentGameResultsData.guessedAt == 5) {
        return resultTexts.winLast[randomIndex];
      } else return resultTexts.winMiddle[randomIndex];
    }
  };

  useEffect(() => {
    const showReview = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsReview(true);
      }
    };
    window.removeEventListener("keydown", showReview);
    window.addEventListener("keydown", showReview);
  });

  return (
    <div
      className={`fade-in-animation ${
        isReview ? "modal-con modal-con-no-bg" : "modal-con"
      }`}
    >
      <div
        className={`modal-content-results ${
          isReview ? "review-game" : "see-results"
        }`}
      >
        {isReview && (
          <button className="btn-arrow" onClick={toggleReview}>
            <ArrowIcon />
          </button>
        )}
        <button className="btn-close" onClick={toggleReview}>
          <CloseIcon />
        </button>
        <h2 className="modal-title">Results</h2>
        <div className="results-title">{resultReactionText()}</div>
        <div className="results-text">
          <div>The solution was:</div>
          <div className="results-solution">{solutionWordDef?.word}</div>
        </div>
        {solutionWordDef && (
          <div className="results-def">
            {solutionWordDef.meanings.map((currentMeaning, index: number) => {
              let tempIndex = 1;
              if (window.innerHeight >= 900) {
                tempIndex = 2;
              }
              if (window.innerHeight <= 720) {
                tempIndex = 0;
              }

              if (index > tempIndex) {
                return;
              } else
                return (
                  <div key={index}>
                    {`(${currentMeaning.partOfSpeech}) ${currentMeaning.definitions[0].definition}`}
                  </div>
                );
            })}
          </div>
        )}
        <div className="results-btn-con">
          <button className="results-btns" onClick={resetGame}>
            Play again
          </button>
          <button className="results-btns" onClick={toggleReview}>
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
