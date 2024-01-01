import React, { useEffect, useState } from "react";
import { StatsData, WordDefinition } from "../../types";
import CloseIcon from "../../icons/CloseIcon";
import ArrowIcon from "../../icons/ArrowIcon";
import { resultTexts } from "../../constants";

interface GameResultProps {
  wordDefinition: WordDefinition;
  guessedAtData: StatsData;
  closeGameResult: () => void;
}

function GameResult({
  wordDefinition,
  guessedAtData,
  closeGameResult,
}: GameResultProps) {
  const [isReview, setIsReview] = useState(false);

  const toggleReview = () => {
    setIsReview(!isReview);
  };

  const resultReactionText = () => {
    const max = 4;
    const min = 0;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomIndex);

    if (!guessedAtData.guessed) {
      return resultTexts.lose[randomIndex];
    } else {
      if (guessedAtData.guessedAt == 1) {
        return resultTexts.winFirst[randomIndex];
      } else if (guessedAtData.guessedAt == 5) {
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

  //testing
  // useEffect(() => {
  //   console.log(wordDefinition);
  // }, [wordDefinition]);

  return (
    <div className={`${isReview ? "modal-con modal-con-no-bg" : "modal-con"}`}>
      <div
        className={`modal-content-results ${
          isReview ? "review-game" : "see-results"
        }`}
      >
        <button className="btn-arrow" onClick={toggleReview}>
          <ArrowIcon />
        </button>
        <button className="btn-close" onClick={toggleReview}>
          <CloseIcon />
        </button>
        <h2 className="modal-title">Results</h2>
        <div className="results-title">{resultReactionText()}</div>
        <div className="results-text">
          <div>The solution was:</div>
          <div className="results-solution">{wordDefinition.word}</div>
        </div>
        {wordDefinition && (
          <div className="results-def">
            {wordDefinition.meanings.map((currentMeaning, index: number) => {
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
          <button className="results-btns" onClick={closeGameResult}>
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
