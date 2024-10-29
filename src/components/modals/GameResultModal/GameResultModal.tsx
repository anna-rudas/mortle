import { useContext, useState } from "react";
import ArrowIcon from "../../../assets/icons/ArrowIcon";
import { AppContext } from "../../../context/context";
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";

function GameResultModal() {
  const [isReview, setIsReview] = useState(false);
  const [hasFadeInAnimationRun, setHasFadeInAnimationRun] = useState(false);

  const { solutionWordDefinition, resetGame } = useContext(AppContext);

  const toggleReview = () => {
    setIsReview(!isReview);
    if (!hasFadeInAnimationRun) {
      setHasFadeInAnimationRun(true);
    }
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
          handleCancel={resetGame}
          modalTitle="Results"
          modalContentStyle="modal-content-game-results"
          modalContainerStyle={`${
            !hasFadeInAnimationRun && "fade-in-animation"
          }`}
        >
          <>
            <div className="text-normal game-results-text">
              <div>The solution was:</div>
              <div className="text-input-large">
                {solutionWordDefinition?.word}
              </div>
            </div>
            {solutionWordDefinition && (
              <div className="text-normal game-results-definition">
                {solutionWordDefinition.meanings.map(
                  (meaning, index: number) => {
                    return (
                      <div key={index}>
                        {`(${meaning.partOfSpeech}) ${meaning.definition}`}
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
