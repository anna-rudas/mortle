import React, { useEffect, useContext } from "react";
import { createRoot } from "react-dom/client";
import Background from "./components/Background/Background";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import { useState } from "react";
import HowToPlay from "./components/HowToPlay/HowToPlay";
import Statistics from "./components/Statistics/Statistics";
import GameResult from "./components/GameResult/GameResult";
import LoadingGame from "./components/LoadingGame/LoadingGame";
import { WordDefinition } from "./types";
import AppContextProvider from "./context";
import { AppContext } from "./context";
import { wordDefTest } from "./test/test-data";
import { dummyResultsData } from "./test/test-data";

//TODO: on mobile, stop mobile keyboard from popping up for input
//TODO: when enter on last line, special case, but still gotta disable line so user cant delete letters or input anything else

function App() {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [solutionWordDef, setSolutionWordDef] = useState<WordDefinition | null>(
    null
  );
  const { currentRow, setCurrentRow, currentColumn, setCurrentColumn } =
    useContext(AppContext);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvent);
    return () => document.removeEventListener("keydown", handleKeyEvent);
  });

  const handleKeyEvent = async (event: KeyboardEvent) => {
    if (!isResultsOpen && !isStatisticsOpen && !isHowToPlayOpen && !isLoading) {
      const inputElement: HTMLElement | null = document.getElementById(
        `${currentRow},${currentColumn}`
      );
      (inputElement as HTMLInputElement).focus();
      if (event.key === "Backspace") {
        if (
          (inputElement as HTMLInputElement).value.length == 0 &&
          currentColumn != 0
        ) {
          setCurrentColumn(currentColumn - 1);
          const prevElement: HTMLInputElement | null = document.getElementById(
            `${currentRow},${currentColumn - 1}`
          ) as HTMLInputElement;
          if (prevElement) prevElement.value = "";
        } else {
          (inputElement as HTMLInputElement).value = "";
        }
      } else if (event.key === "Enter") {
        //TODO: disable input while await
        const isInputWordValid = await checkInputWord();
        if (!isInputWordValid) {
          return;
        }

        if (currentRow != 4) {
          setCurrentRow(currentRow + 1);
          setCurrentColumn(0);
          window.setTimeout(
            () => document.getElementById(`${currentRow + 1},0`)?.focus(),
            0
          );
        }
      } else if (event.keyCode > 64 && event.keyCode < 91) {
        if (inputElement) {
          (inputElement as HTMLInputElement).value = event.key;
        }
        if (currentColumn != 4) {
          setCurrentColumn(currentColumn + 1);
        }
      }
    }
  };

  const openHowToPlay = () => {
    setIsHowToPlayOpen(true);
  };
  const closeHowToPlay = () => {
    setIsHowToPlayOpen(false);
  };
  const openStatistics = () => {
    setIsStatisticsOpen(true);
  };
  const closeStatistics = () => {
    setIsStatisticsOpen(false);
  };
  // const openGameResult = () => {
  //   setIsResultsOpen(true);
  // };
  const closeGameResult = () => {
    setIsResultsOpen(false);
  };

  // const getRandomWord = (): Promise<string> => {
  //   return fetch("https://random-word-api.herokuapp.com/word?length=5")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //setRandomWord(data[0]);
  //       return data[0];
  //     })
  //     .catch((error) => {
  //       //TODO handle error
  //       console.error(error);
  //     });
  // };

  // const getWordDefinition = (
  //   wordToCheck: string
  // ): Promise<WordDefinition | null> => {
  //   return fetch(
  //     `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => data[0] || null)
  //     .catch((error) => {
  //       //TODO handle error
  //       console.error(error);
  //     });
  // };

  const getWordDefinitionTest = (): WordDefinition => {
    return wordDefTest;
  };

  const checkInputWord = async () => {
    const inputWord = new Array(5);

    //get the input word
    for (let i = 0; i < 5; i++) {
      const inputLetter: string = (
        document.getElementById(`${currentRow},${i}`) as HTMLInputElement
      )?.value;
      inputWord[i] = inputLetter.toLowerCase();
    }

    if (inputWord.join("") == solutionWordDef?.word.toLowerCase()) {
      //input is the solution
      inputWord.forEach((inputLetter, inputLetterIndex) => {
        modifyLetterColor(inputLetterIndex, "letter-correct");
        modifyKeyboardLetterColor(inputLetter, "letter-correct");
      });
      //TODO: game over
      return true;
    } else if (inputWord.join("").split("").length == 5) {
      // const getInputWordDef: WordDefinition | null = await getWordDefinition(
      //   inputWord.join("")
      // );

      const getInputWordDef: WordDefinition | null = getWordDefinitionTest();

      if (getInputWordDef) {
        //input word is valid (5 letters and def)
        const solutionWord = solutionWordDef?.word.toLowerCase().split("");
        inputWord.forEach((inputLetter, inputLetterIndex) => {
          if (solutionWord && solutionWord.indexOf(inputLetter) < 0) {
            modifyLetterColor(inputLetterIndex, "letter-no");
            modifyKeyboardLetterColor(inputLetter, "letter-no");
          }
          if (solutionWord && solutionWord[inputLetterIndex] == inputLetter) {
            modifyLetterColor(inputLetterIndex, "letter-correct");
            modifyKeyboardLetterColor(inputLetter, "letter-correct");
          } else if (solutionWord) {
            const timesInSolution =
              solutionWord.join().split(inputLetter).length - 1;

            const incorrectIndexes = [];
            let correctTimes = 0;

            for (let j = 0; j < inputWord.length; j++) {
              if (inputWord[j] === inputLetter) {
                if (inputWord[j] === solutionWord[j]) {
                  correctTimes++;
                } else {
                  incorrectIndexes.push(j);
                }
              }
            }
            const yellowTimes = timesInSolution - correctTimes;

            for (let j = 0; j < incorrectIndexes.length; j++) {
              if (inputLetterIndex === incorrectIndexes[j]) {
                if (j < yellowTimes) {
                  modifyLetterColor(inputLetterIndex, "letter-wrong");
                  modifyKeyboardLetterColor(inputLetter, "letter-wrong");
                } else {
                  modifyLetterColor(inputLetterIndex, "letter-no");
                }
              }
            }
          }
        });

        return true;
      } else {
        //input word is not valid (no def)
        return false;
      }
    } else {
      //input word is not valid (not 5 letters)
      return false;
    }
  };

  const modifyLetterColor = (letterIndex: number, className: string) => {
    const letterElement = document.getElementById(
      `${currentRow},${letterIndex}`
    );
    letterElement?.parentElement?.classList.add(`${className}`);
  };

  const modifyKeyboardLetterColor = (
    inputLetter: string,
    className: string
  ) => {
    const keyboardLetters: any = document.querySelectorAll(
      ".keyboard-tooth-con"
    );

    keyboardLetters.forEach((currentKey: any) => {
      if (
        currentKey.innerText.toLowerCase() == inputLetter &&
        !currentKey.classList.contains("letter-correct")
      ) {
        currentKey.classList.remove("letter-wrong");
        currentKey.classList.add(`${className}`);
      }
    });
  };

  const getSolutionWithDefinition = async () => {
    const loopMax = 10;
    let loopCounter = 0;

    while (loopCounter < loopMax) {
      loopCounter++;
      //const randomWord: string = await getRandomWord();
      // const randomWordDef: WordDefinition | null = await getWordDefinition(
      //   randomWord
      // );
      const randomWordDef = getWordDefinitionTest();
      if (randomWordDef) {
        setSolutionWordDef(randomWordDef);
        return;
      }
    }

    //TODO: couldnt get a def after trying 10 times --> error boundary
    console.log("some error");
  };

  useEffect(() => {
    getSolutionWithDefinition().then(() => setIsLoading(false));
  }, []);

  return (
    <div className="wrapper">
      <Background />
      <div className="game-content">
        <Header openHowToPlay={openHowToPlay} openStatistics={openStatistics} />
        <Game />
        {isHowToPlayOpen && <HowToPlay closeHowToPlay={closeHowToPlay} />}
        {isStatisticsOpen && <Statistics closeStatistics={closeStatistics} />}
      </div>
      {isResultsOpen && solutionWordDef && (
        <GameResult
          wordDefinition={solutionWordDef}
          guessedAtData={dummyResultsData}
          closeGameResult={closeGameResult}
        />
      )}
      {isLoading && <LoadingGame />}
    </div>
  );
}

function AppWithProvider() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

export default AppWithProvider;

createRoot(document.getElementById("root")!).render(<AppWithProvider />);
