import React, { useContext, useState } from "react";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import { resultTexts } from "../../../data/constants";
import { AppContext } from "../../../context/context";
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";

function GameResultModal() {
  const [isReview, setIsReview] = useState(false);
  const [hasFadeInAnimationRun, setHasFadeInAnimationRun] = useState(false);

  const { solutionWordDef, currentGameResultsData, resetGame } =
    useContext(AppContext);

  const toggleReview = () => {
    setIsReview(!isReview);
    if (!hasFadeInAnimationRun) {
      setHasFadeInAnimationRun(true);
    }
  };

  const resultReactionText = () => {
    const max = 4;
    const min = 0;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!currentGameResultsData.guessed) {
      return resultTexts.lose[randomIndex];
    }
    if (currentGameResultsData.guessedAt === 1) {
      return resultTexts.winFirst[randomIndex];
    }
    if (currentGameResultsData.guessedAt === 5) {
      return resultTexts.winLast[randomIndex];
    }
    return resultTexts.winMiddle[randomIndex];
  };

  return (
    <>
      {isReview ? (
        <ModalContainer
          handleCancel={toggleReview}
          modalContentStyle="modal-content-game-review"
          modalContainerStyle="modal-container-no-bg"
        >
          <div className="arrow-btn-container" onClick={toggleReview}>
            <span className="arrow-btn">
              <ArrowIcon />
            </span>
          </div>
        </ModalContainer>
      ) : (
        <ModalContainer
          handleCancel={toggleReview}
          modalTitle="Results"
          modalContentStyle="modal-content-game-results"
          modalContainerStyle={`${
            !hasFadeInAnimationRun && "fade-in-animation"
          }`}
        >
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
              <PrimaryButton handleClick={resetGame} buttonText="Play again" />
              <PrimaryButton handleClick={toggleReview} buttonText="Review" />
            </div>
          </>
        </ModalContainer>
      )}
    </>
  );
}

export default GameResultModal;
