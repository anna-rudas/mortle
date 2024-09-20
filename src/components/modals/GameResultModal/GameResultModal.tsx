import React, { useContext, useEffect, useState } from "react";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import { resultTexts } from "../../../data/constants";
import { AppContext } from "../../../context/context";
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";

function GameResultModal() {
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
      if (currentGameResultsData.guessedAt === 1) {
        return resultTexts.winFirst[randomIndex];
      } else if (currentGameResultsData.guessedAt === 5) {
        return resultTexts.winLast[randomIndex];
      } else return resultTexts.winMiddle[randomIndex];
    }
  };
  const showReview = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsReview(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", showReview);
    return () => {
      window.removeEventListener("keydown", showReview);
    };
  });

  return (
    <>
      <ModalContainer
        modalTitle={`${!isReview ? "Results" : ""}`}
        modalContentStyle={`${
          isReview ? "modal-content-game-review" : "modal-content-game-results"
        }`}
        modalContainerStyle={`fade-in-animation ${
          isReview && "modal-container-no-bg"
        }`}
        handleCancel={toggleReview}
      >
        <>
          {isReview ? (
            <div className="arrow-btn-container" onClick={toggleReview}>
              <span className="arrow-btn">
                <ArrowIcon />
              </span>
            </div>
          ) : (
            <>
              <div className="text-subtitle game-results-title">
                {resultReactionText()}
              </div>
              <div className="text-normal game-results-text">
                <div>The solution was:</div>
                <div className="text-input-large">{solutionWordDef?.word}</div>
              </div>
              {solutionWordDef && (
                <div className="text-normal game-results-definition">
                  {solutionWordDef.meanings.map(
                    (currentMeaning, index: number) => {
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
                    }
                  )}
                </div>
              )}
              <div className="game-results-button-container">
                <PrimaryButton
                  handleClick={resetGame}
                  buttonText="Play again"
                />
                <PrimaryButton handleClick={toggleReview} buttonText="Review" />
              </div>
            </>
          )}
        </>
      </ModalContainer>
    </>
  );
}

export default GameResultModal;
