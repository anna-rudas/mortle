import React, { useEffect, useState } from "react";
import { WordDefinition } from "../../types";
import CloseIcon from "../../icons/CloseIcon";
import ArrowIcon from "../../icons/ArrowIcon";

interface GameResultProps {
  wordDefinition: WordDefinition;
  solutionWord: string;
  closeGameResult: () => void;
}

function GameResult({
  solutionWord,
  wordDefinition,
  closeGameResult,
}: GameResultProps) {
  const [isReview, setIsReview] = useState(false);

  const openReview = () => {
    setIsReview(true);
  };

  const closeReview = () => {
    setIsReview(false);
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
  useEffect(() => {
    console.log(wordDefinition);
  }, [wordDefinition]);

  return (
    <div className={`modal-con ${isReview ? "modal-con-review" : ""}`}>
      <div
        className={`modal-content-results ${
          isReview ? "review-game" : "see-results"
        }`}
      >
        <button className="btn-arrow" onClick={closeReview}>
          <ArrowIcon />
        </button>
        <button className="btn-close" onClick={openReview}>
          <CloseIcon />
        </button>
        <h2 className="modal-title">Results</h2>
        <div className="results-title">
          winFirst, winLast, winMiddle and lose texts
        </div>
        <div className="results-text">
          <div>The solution is:</div>
          <div className="results-solution">{solutionWord}</div>
        </div>
        {wordDefinition.isDef && (
          <div className="results-def">
            {wordDefinition.def.meanings.map(
              (currentMeaning: any, index: number) => {
                //TODO: small 1, medium 2, large 3 definitions
                if (index > 0) {
                  return;
                } else
                  return (
                    <div key={index}>
                      {`(${currentMeaning.partOfSpeech}) ${currentMeaning.definitions[0].definition}`}
                    </div>
                  );
              }
            )}
          </div>
        )}
        {!wordDefinition.isDef && <div>noDefWin or noDefLose text</div>}
        <div className="results-btn-con">
          <button className="results-btns" onClick={closeGameResult}>
            Play again
          </button>
          <button className="results-btns" onClick={openReview}>
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameResult;
