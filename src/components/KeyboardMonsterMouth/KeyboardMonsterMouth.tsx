import React from "react";
import { keyboardLetters } from "../../constants";

function KeyboardMonsterMouth() {
  const handleClickInputs = (event: any, rowIndex: any, letterIndex: any) => {
    if (rowIndex === 2 && letterIndex === 0) {
      console.log("enter");
    } else if (rowIndex === 2 && letterIndex === 8) {
      console.log("backspace");
    } else {
      console.log(event.target.innerText);
    }
  };

  return (
    <div className="keyboard-monster-mouth">
      <div className="keyboard-teeth-con">
        {keyboardLetters.map((currentRow, currentRowIndex) => {
          return (
            <div key={currentRowIndex} className="keyboard-teeth-row">
              {currentRow.map((currentLetter, currentLetterIndex) => {
                return (
                  <div key={currentLetterIndex} className="keyboard-tooth-con">
                    <button
                      onClick={(event) =>
                        handleClickInputs(
                          event,
                          currentRowIndex,
                          currentLetterIndex
                        )
                      }
                      className="keyboard-tooth-btn"
                    >
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
