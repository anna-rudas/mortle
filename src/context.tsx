import React, { ReactNode, createContext, useState } from "react";
import { wordLength, numberOfTries } from "./constants";
import { WordDefinition, LetterColorClass } from "./types";
import { getWordDefinitionTest, getWordDefinition } from "./helpers";

interface AppContextInterface {
  currentRow: number;
  setCurrentRow: (value: number) => void;
  currentColumn: number;
  setCurrentColumn: (value: number) => void;
  inputLetters: readonly string[][];
  setInputLetterValue: (newVal: string, isPrevVal?: boolean) => void;
  solutionWordDef: WordDefinition | null;
  setSolutionWordDef: (value: WordDefinition) => void;
  lastDoneRow: number;
  setLastDoneRow: (value: number) => void;
  showInvalidWordWarning: () => void;
  isWordInvalidWarning: boolean;
  checkInputWord: (currentRow: number) => Promise<boolean>;
  compareInputAndSolution: (rowIndex: number) => LetterColorClass[];
  isFetching: boolean;
  setIsFetching: (value: boolean) => void;
}

const defaultContextValue: AppContextInterface = {
  currentRow: 0,
  setCurrentRow: () => {},
  currentColumn: 0,
  setCurrentColumn: () => {},
  inputLetters: [],
  setInputLetterValue: () => {},
  solutionWordDef: { word: "", meanings: [] },
  setSolutionWordDef: () => {},
  lastDoneRow: 0,
  setLastDoneRow: () => {},
  showInvalidWordWarning: () => {},
  isWordInvalidWarning: false,
  checkInputWord: async () => false,
  compareInputAndSolution: () => [],
  isFetching: false,
  setIsFetching: () => {},
};

export const AppContext =
  createContext<AppContextInterface>(defaultContextValue);

type AppContextProviderProps = { children?: ReactNode };

function AppContextProvider({ children }: AppContextProviderProps) {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [inputLetters, setInputLetters] = useState<readonly string[][]>(
    new Array(numberOfTries).fill(0).map(() => new Array(wordLength).fill(""))
  );
  const [solutionWordDef, setSolutionWordDef] = useState<WordDefinition | null>(
    null
  );
  const [lastDoneRow, setLastDoneRow] = useState(0);
  const [isWordInvalidWarning, setIsWordInvalidWarning] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const setInputLetterValue = (newVal: string, isPrevVal?: boolean) => {
    const tempInputLetters: string[][] = [...inputLetters];
    if (isPrevVal) {
      tempInputLetters[currentRow][currentColumn - 1] = newVal;
    } else {
      tempInputLetters[currentRow][currentColumn] = newVal;
    }
    setInputLetters(tempInputLetters);
  };

  const showInvalidWordWarning = () => {
    setIsWordInvalidWarning(true);
    setTimeout(() => {
      setIsWordInvalidWarning(false);
    }, 2000);
  };

  const checkInputWord = async (currentRow: number) => {
    const inputWord = inputLetters[currentRow];

    if (
      inputWord.join("").toUpperCase() == solutionWordDef?.word.toUpperCase()
    ) {
      //input is the solution
      //TODO: game over
      return true;
    } else if (inputWord.join("").split("").length == wordLength) {
      //---real data
      // const getInputWordDef: WordDefinition | null = await getWordDefinition(
      //   inputWord.join("")
      // );

      //---test data
      const getInputWordDef: WordDefinition | null = getWordDefinitionTest();

      if (getInputWordDef) {
        //input word is valid (5 letters and def)
        return true;
      } else {
        //input word is not valid (no def)
        showInvalidWordWarning();
        return false;
      }
    } else {
      //input word is not valid (not 5 letters)
      showInvalidWordWarning();
      return false;
    }
  };

  const compareInputAndSolution = (rowIndex: number): LetterColorClass[] => {
    if (!solutionWordDef) {
      throw new Error("Solution word unreachable.");
    }

    const inputWord = inputLetters[rowIndex];
    const solutionWord = solutionWordDef.word.toLocaleUpperCase();

    return inputWord.map((inputLetter, inputLetterIndex) => {
      if (solutionWord.indexOf(inputLetter) < 0) {
        return "letter-no";
      } else if (solutionWord[inputLetterIndex] == inputLetter) {
        return "letter-correct";
      } else {
        //the letter is in the solution, but in the wrong spot

        const incorrectIndexes = [];
        let correctTimesInSolution = 0;

        for (let j = 0; j < inputWord.length; j++) {
          if (inputWord[j] === inputLetter) {
            if (inputWord[j] === solutionWord[j]) {
              correctTimesInSolution++;
            } else {
              incorrectIndexes.push(j);
            }
          }
        }

        const timesInSolution = solutionWord.split(inputLetter).length - 1;
        const wrongTimesInInput = timesInSolution - correctTimesInSolution;

        for (let j = 0; j < incorrectIndexes.length; j++) {
          if (inputLetterIndex === incorrectIndexes[j]) {
            if (j < wrongTimesInInput) {
              return "letter-wrong";
            } else {
              return "letter-no";
            }
          }
        }
      }
      return "letter-no";
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentRow,
        setCurrentRow,
        currentColumn,
        setCurrentColumn,
        inputLetters,
        setInputLetterValue,
        solutionWordDef,
        setSolutionWordDef,
        lastDoneRow,
        setLastDoneRow,
        showInvalidWordWarning,
        isWordInvalidWarning,
        checkInputWord,
        compareInputAndSolution,
        isFetching,
        setIsFetching,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
