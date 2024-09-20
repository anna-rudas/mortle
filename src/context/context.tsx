import React, { ReactNode, createContext, useState } from "react";
import { wordLength, numberOfTries } from "../data/constants";
import { WordDefinition, LetterColorClass, StatsData } from "../types/types";
import {
  getWordDefinition,
  getRandomWord,
  getStats,
  saveStats,
} from "../utilities/helpers";
import { useErrorBoundary } from "react-error-boundary";
import Filter from "bad-words";

interface AppContextInterface {
  currentRow: number;
  setCurrentRow: (value: number) => void;
  currentColumn: number;
  setCurrentColumn: (value: number) => void;
  inputLetters: readonly string[][];
  setInputLetterValue: (newVal: string, isPrevVal?: boolean) => void;
  solutionWordDef: WordDefinition | null;
  lastDoneRow: number;
  setLastDoneRow: (value: number) => void;
  isWordInvalidWarning: boolean;
  checkInputWord: (currentRow: number) => Promise<boolean>;
  compareInputAndSolution: (rowIndex: number) => LetterColorClass[];
  isFetching: boolean;
  setIsFetching: (value: boolean) => void;
  isGameOver: boolean;
  currentGameResultsData: StatsData;
  resetGame: () => void;
  getSolutionWithDefinition: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const defaultContextValue: AppContextInterface = {
  currentRow: 0,
  setCurrentRow: () => {},
  currentColumn: 0,
  setCurrentColumn: () => {},
  inputLetters: [],
  setInputLetterValue: () => {},
  solutionWordDef: { word: "", meanings: [] },
  lastDoneRow: 0,
  setLastDoneRow: () => {},
  isWordInvalidWarning: false,
  checkInputWord: async () => false,
  compareInputAndSolution: () => [],
  isFetching: false,
  setIsFetching: () => {},
  isGameOver: false,
  currentGameResultsData: { guessed: false },
  resetGame: () => {},
  getSolutionWithDefinition: async () => {},
  isLoading: true,
  setIsLoading: () => {},
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
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentGameResultsData, setCurrentGameResultsData] =
    useState<StatsData>({ guessed: false });
  const [isLoading, setIsLoading] = useState(true);

  const { showBoundary } = useErrorBoundary();
  const blockList = process.env.REACT_APP_BLOCKLIST;
  const filter = new Filter({ list: blockList?.split(" ") });

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

  const getSolutionWithDefinition = async () => {
    const loopMax = 10;
    let loopCounter = 0;

    while (loopCounter < loopMax) {
      loopCounter++;

      //----real data
      const randomWord: string = await getRandomWord();
      const randomWordDef: WordDefinition | null = await getWordDefinition(
        randomWord
      );

      //----test data
      //const randomWordDef = getWordDefinitionTest();

      if (randomWordDef && !filter.isProfane(randomWordDef.word)) {
        setSolutionWordDef(randomWordDef);
        return;
      }
    }

    showBoundary("Could not get solution word.");
  };

  const checkInputWord = async (currentRow: number) => {
    const inputWord = inputLetters[currentRow].join("");
    if (inputWord.toUpperCase() === solutionWordDef?.word.toUpperCase()) {
      handleGameOver(true);
      return true;
    } else if (inputWord.length === wordLength) {
      //---real data
      const getInputWordDef: WordDefinition | null = await getWordDefinition(
        inputWord
      );

      //---test data
      //const getInputWordDef: WordDefinition | null = getWordDefinitionTest();

      if (getInputWordDef) {
        //input word is valid (5 letters and def)
        if (currentRow === wordLength - 1) {
          handleGameOver(false);
        }
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
      } else if (solutionWord[inputLetterIndex] === inputLetter) {
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

  const updateSavedStatistics = (currGameData: StatsData) => {
    const savedStatistics = getStats();
    const updatedStatistics = [...savedStatistics, currGameData];
    saveStats(updatedStatistics);
  };

  const handleGameOver = (hasGuessed: boolean) => {
    setIsGameOver(true);
    if (hasGuessed) {
      updateSavedStatistics({ guessed: true, guessedAt: currentRow + 1 });
      setCurrentGameResultsData({ guessed: true, guessedAt: currentRow + 1 });
    } else {
      updateSavedStatistics({ guessed: false });
      setCurrentGameResultsData({ guessed: false });
    }
  };

  const resetGame = () => {
    setIsLoading(true);
    setIsGameOver(false);
    setCurrentGameResultsData({ guessed: false });
    setInputLetters(
      new Array(numberOfTries).fill(0).map(() => new Array(wordLength).fill(""))
    );
    setCurrentRow(0);
    setCurrentColumn(0);
    setLastDoneRow(0);
    getSolutionWithDefinition().then(() => setIsLoading(false));
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
        lastDoneRow,
        setLastDoneRow,
        isWordInvalidWarning,
        checkInputWord,
        compareInputAndSolution,
        isFetching,
        setIsFetching,
        isGameOver,
        currentGameResultsData,
        resetGame,
        getSolutionWithDefinition,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
