import React, { useContext, useEffect, useState } from "react";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import { resultTexts } from "../../../data/constants";
import { AppContext } from "../../../context/context";
import CloseButton from "../../buttons/CloseButton/CloseButton";
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";

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
      className={`fade-in-animation modal-con  ${
        isReview ? "modal-con-no-bg" : ""
      }`}
    >
      {!isReview && (
        <div className="modal-content-results">
          <CloseButton handleClick={toggleReview} />
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
            <PrimaryButton handleClick={resetGame} buttonText="Play again" />
            <PrimaryButton handleClick={toggleReview} buttonText="Review" />
          </div>
        </div>
      )}
      {isReview && (
        <div className="modal-content-review" onClick={toggleReview}>
          <button className="btn-arrow">
            <ArrowIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default GameResult;
