import React, { useEffect } from "react";
import {
  howToPlayContent,
  letterColoringClasses,
} from "../../../data/constants";
import ModalContainer from "../../templates/ModalContainer/ModalContainer";

interface HowToPlayModalProps {
  closeHowToPlay: () => void;
}

function HowToPlayModal({ closeHowToPlay }: HowToPlayModalProps) {
  const closeModal = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeHowToPlay();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  });

  return (
    <ModalContainer
      modalTitle="How to play"
      handleCancel={closeHowToPlay}
      modalContentStyle="modal-content-how-to-play"
    >
      <div className="how-to-play-text-container">
        <span className="text-normal">Guess the word in 5 tries</span>
        <span className="text-normal">
          Each guess must be a valid 5 letter word
        </span>
        <span className="text-normal">
          The color of the tiles will change to show how close your guess was to
          the word
        </span>
      </div>
      <div className="how-to-play-examples-container">
        {howToPlayContent.map((current, index) => {
          return (
            <div className="how-to-play-examples" key={index}>
              <div className="how-to-play-example-word">
                {current.exampleWord
                  .split("")
                  .map((currentLetter, letterIndex) => {
                    return (
                      <div
                        className={`text-input-large how-to-play-letter-box ${
                          letterIndex === index + 1
                            ? letterColoringClasses[index]
                            : ""
                        }`}
                        key={letterIndex}
                      >
                        <span>{currentLetter}</span>
                      </div>
                    );
                  })}
              </div>
              <span className="text-normal">{current.explanation}</span>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}

export default HowToPlayModal;
