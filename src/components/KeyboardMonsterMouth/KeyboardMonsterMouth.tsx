import React from "react";
import { keyboardLetters } from "../../constants";

function KeyboardMonsterMouth() {
  return (
    <div className="keyboard-monster-mouth">
      <div className="keyboard-teeth-con">
        {keyboardLetters.map((currentRow, currentRowIndex) => {
          return (
            <div key={currentRowIndex} className="teeth-row">
              {currentRow.map((currentLetter, currentLetterIndex) => {
                return (
                  <div key={currentLetterIndex} className="keyboard-tooth-con">
                    <button className="keyboard-tooth-btn">
                      {currentLetter}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KeyboardMonsterMouth;
