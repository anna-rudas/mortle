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
  isWordInvalidWarning: boolean;
  isInputWordValid: (currentRow: number) => Promise<boolean>;
  compareInputAndSolution: (rowIndex: number) => LetterColorClass[];
  isFetching: boolean;
  setIsFetching: (value: boolean) => void;
  isGameOver: boolean;
  currentGameResultsData: StatsData;
  resetGame: () => void;
  getSolutionWithDefinition: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isHowToPlayModalOpen: boolean;
  setIsHowToPlayModalOpen: (value: boolean) => void;
  isStatisticsModalOpen: boolean;
  setIsStatisticsModalOpen: (value: boolean) => void;
}

const defaultContextValue: AppContextInterface = {
  currentRow: 0,
  setCurrentRow: () => {},
  currentColumn: 0,
  setCurrentColumn: () => {},
  inputLetters: [],
  setInputLetterValue: () => {},
  solutionWordDef: { word: "", meanings: [] },
  isWordInvalidWarning: false,
  isInputWordValid: async () => false,
  compareInputAndSolution: () => [],
  isFetching: false,
  setIsFetching: () => {},
  isGameOver: false,
  currentGameResultsData: { guessed: false },
  resetGame: () => {},
  getSolutionWithDefinition: async () => {},
  isLoading: true,
  setIsLoading: () => {},
  isHowToPlayModalOpen: false,
  setIsHowToPlayModalOpen: () => {},
  isStatisticsModalOpen: false,
  setIsStatisticsModalOpen: () => {},
};

export const AppContext =
  createContext<AppContextInterface>(defaultContextValue);

type AppContextProviderProps = { children?: ReactNode };

function AppContextProvider({ children }: AppContextProviderProps) {
  //game content
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [inputLetters, setInputLetters] = useState<readonly string[][]>(
    new Array(numberOfTries).fill(0).map(() => new Array(wordLength).fill(""))
  );
  const [solutionWordDef, setSolutionWordDef] = useState<WordDefinition | null>(
    null
  );
  //game state
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentGameResultsData, setCurrentGameResultsData] =
    useState<StatsData>({ guessed: false });
  //loading check
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //msc
  const { showBoundary } = useErrorBoundary();
  const blockList = process.env.REACT_APP_BLOCKLIST;
  const filter = new Filter({ list: blockList?.split(" ") });
  //modals open check
  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false);
  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);
  const [isWordInvalidWarning, setIsWordInvalidWarning] = useState(false);

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

    for (let i = 0; i < loopMax; i++) {
      const randomWord: string = await getRandomWord();
      const randomWordDef: WordDefinition | null = await getWordDefinition(
        randomWord
      );
      if (randomWordDef && !filter.isProfane(randomWordDef.word)) {
        setSolutionWordDef(randomWordDef);
        return;
      }
    }

    showBoundary("Could not get solution word.");
  };

  const isInputWordValid = async (currentRow: number) => {
    if (solutionWordDef) {
      const inputWord = inputLetters[currentRow].join("").replace(/ /g, "");
      if (inputWord.toUpperCase() === solutionWordDef.word.toUpperCase()) {
        handleGameOver({ hasGuessed: true });
        return true;
      }
      if (inputWord.length === wordLength) {
        const getInputWordDef: WordDefinition | null = await getWordDefinition(
          inputWord
        );

        if (getInputWordDef) {
          //input word is valid (5 letters and def)
          if (currentRow === numberOfTries - 1) {
            handleGameOver({ hasGuessed: false });
          }
          return true;
        }

        //input word is not valid (no def)
        showInvalidWordWarning();
        return false;
      }

      //input word is not valid (not 5 letters)
      showInvalidWordWarning();
      return false;
    }
    return false;
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
      }
      if (solutionWord[inputLetterIndex] === inputLetter) {
        return "letter-correct";
      }
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
          }
          return "letter-no";
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

  const handleGameOver = ({ hasGuessed }: { hasGuessed: boolean }) => {
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
        isWordInvalidWarning,
        isInputWordValid,
        compareInputAndSolution,
        isFetching,
        setIsFetching,
        isGameOver,
        currentGameResultsData,
        resetGame,
        getSolutionWithDefinition,
        isLoading,
        setIsLoading,
        isHowToPlayModalOpen,
        setIsHowToPlayModalOpen,
        isStatisticsModalOpen,
        setIsStatisticsModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
