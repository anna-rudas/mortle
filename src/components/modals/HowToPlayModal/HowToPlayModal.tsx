import React, { useEffect } from "react";
import {
  howToPlayContent,
  letterColoringClasses,
} from "../../../data/constants";
import CloseButton from "../../buttons/CloseButton/CloseButton";

interface HowToPlayModalProps {
  closeHowToPlay: () => void;
}

function HowToPlayModal({ closeHowToPlay }: HowToPlayModalProps) {
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHowToPlay();
      }
    };
    window.removeEventListener("keydown", closeModal);
    window.addEventListener("keydown", closeModal);
  });

  return (
    <div className="modal-con">
      <div className="modal-content-howto">
        <CloseButton handleClick={closeHowToPlay} />
        <h2 className="text-title">How to play</h2>
        <div className="howto-text-con">
          <span className="text-normal">Guess the word in 5 tries</span>
          <span className="text-normal">
            Each guess must be a valid 5 letter word
          </span>
          <span className="text-normal">
            The color of the tiles will change to show how close your guess was
            to the word
          </span>
        </div>
        <div className="howto-con">
          {howToPlayContent.map((current, index) => {
            return (
              <div className="examples" key={index}>
                <div className="example-word">
                  {current.exampleWord
                    .split("")
                    .map((currentLetter, letterIndex) => {
                      return (
                        <div
                          className={`text-input-large letter-box ${
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
      </div>
    </div>
  );
}

export default HowToPlayModal;
