import React, { useContext } from "react";
import { keyboardLetters } from "../../constants";
import { AppContext } from "../../context";

function KeyboardMonsterMouth() {
  const { currentRow, currentColumn, setCurrentRow, setCurrentColumn } =
    useContext(AppContext);

  const handleClickInputs = (
    event: React.MouseEvent<HTMLElement>,
    rowIndex: number,
    letterIndex: number
  ) => {
    const inputElement: HTMLElement | null = document.getElementById(
      `${currentRow},${currentColumn}`
    );
    if (rowIndex === 2 && letterIndex === 0) {
      //clicked enter
      if (currentRow != 4) {
        setCurrentRow(currentRow + 1);
        setCurrentColumn(0);
      }
    } else if (rowIndex === 2 && letterIndex === 8) {
      //clicked backspace
      if (
        (inputElement as HTMLInputElement).value.length == 0 &&
        currentColumn != 0
      ) {
        const tempColumn = currentColumn - 1;
        setCurrentColumn(tempColumn);
        const elementToDelete: HTMLElement | null = document.getElementById(
          `${currentRow},${tempColumn}`
        );
        (elementToDelete as HTMLInputElement).value = "";
      } else {
        (inputElement as HTMLInputElement).value = "";
      }
    } else {
      //clicked letter
      const inputElement: HTMLElement | null = document.getElementById(
        `${currentRow},${currentColumn}`
      );
      if (inputElement) {
        const eventTarget = event.target as HTMLElement;
        (inputElement as HTMLInputElement).value = eventTarget.innerText;
      }
      if (currentColumn != 4) {
        setCurrentColumn(currentColumn + 1);
      }
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
