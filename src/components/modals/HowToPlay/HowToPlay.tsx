import React, { useEffect } from "react";
import {
  howToPlayContent,
  letterColoringClasses,
} from "../../../data/constants";
import CloseButton from "../../buttons/CloseButton/CloseButton";

interface HowToPlayProps {
  closeHowToPlay: () => void;
}

function HowToPlay({ closeHowToPlay }: HowToPlayProps) {
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
        <h2 className="modal-title">How to play</h2>
        <div className="howto-text-con">
          <p>Guess the word in 5 tries</p>
          <p>Each guess must be a valid 5 letter word</p>
          <p>
            The color of the tiles will change to show how close your guess was
            to the word
          </p>
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
                          className={`letter-box ${
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
                <p>{current.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
