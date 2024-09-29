import React, { ReactNode, createContext, useState } from "react";
import { wordLength, numberOfTries, statisticsKey } from "../data/constants";
import { WordDefinition, LetterColorClass, StatsData } from "../types/types";
import { getWordDefinition, getRandomWord } from "../utilities/helpers";
import { useErrorBoundary } from "react-error-boundary";
import Filter from "bad-words";
import useLocalStorageState from "use-local-storage-state";

interface AppContextInterface {
  currentRow: number;
  setCurrentRow: (value: number) => void;
  currentColumn: number;
  setCurrentColumn: (value: number) => void;
  inputLetters: readonly string[][];
  setInputLetterValue: (newVal: string, isPrevVal?: boolean) => void;
  solutionWordDefinition: WordDefinition | null;
  isWordInvalidWarning: boolean;
  isInputWordValid: (currentRow: number) => Promise<boolean>;
  compareInputAndSolution: (rowIndex: number) => LetterColorClass[];
  isFetching: boolean;
  setIsFetching: (value: boolean) => void;
  isGameOver: boolean;
  resetGame: () => void;
  getSolutionWithDefinition: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isHowToPlayModalOpen: boolean;
  setIsHowToPlayModalOpen: (value: boolean) => void;
  isStatisticsModalOpen: boolean;
  setIsStatisticsModalOpen: (value: boolean) => void;
  statistics: StatsData[];
  clearInvalidWordWarningTimeout: () => void;
}

const defaultContextValue: AppContextInterface = {
  currentRow: 0,
  setCurrentRow: () => {},
  currentColumn: 0,
  setCurrentColumn: () => {},
  inputLetters: [],
  setInputLetterValue: () => {},
  solutionWordDefinition: { word: "", meanings: [] },
  isWordInvalidWarning: false,
  isInputWordValid: async () => false,
  compareInputAndSolution: () => [],
  isFetching: false,
  setIsFetching: () => {},
  isGameOver: false,
  resetGame: () => {},
  getSolutionWithDefinition: async () => {},
  isLoading: true,
  setIsLoading: () => {},
  isHowToPlayModalOpen: false,
  setIsHowToPlayModalOpen: () => {},
  isStatisticsModalOpen: false,
  setIsStatisticsModalOpen: () => {},
  statistics: [],
  clearInvalidWordWarningTimeout: () => {},
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
  const [solutionWordDefinition, setSolutionWordDefinition] =
    useState<WordDefinition | null>(null);
  //game state
  const [isGameOver, setIsGameOver] = useState(false);
  //loading check
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //msc
  const { showBoundary } = useErrorBoundary();
  const blockList = process.env.REACT_APP_BLOCKLIST;
  const filter = new Filter({ list: blockList?.split(" ") });
  const [invalidWordWarningTimeoutId, setInvalidWordWarningTimeoutId] =
    useState<NodeJS.Timeout | null>(null);
  //modals open check
  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false);
  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);
  const [isWordInvalidWarning, setIsWordInvalidWarning] = useState(false);

  const [statistics, setStatistics] = useLocalStorageState<StatsData[]>(
    statisticsKey,
    {
      defaultValue: [],
    }
  );

  const setInputLetterValue = (newValue: string, isPrevValue?: boolean) => {
    const tempInputLetters: string[][] = [...inputLetters];
    if (isPrevValue) {
      tempInputLetters[currentRow][currentColumn - 1] = newValue;
    } else {
      tempInputLetters[currentRow][currentColumn] = newValue;
    }
    setInputLetters(tempInputLetters);
  };

  const showInvalidWordWarning = () => {
    setIsWordInvalidWarning(true);
    const timeoutId = setTimeout(() => {
      setIsWordInvalidWarning(false);
    }, 2000);
    setInvalidWordWarningTimeoutId(timeoutId);
  };

  const clearInvalidWordWarningTimeout = () => {
    if (invalidWordWarningTimeoutId) {
      clearTimeout(invalidWordWarningTimeoutId);
      setIsWordInvalidWarning(false);
    }
  };

  const getSolutionWithDefinition = async () => {
    const loopMax = 10;

    for (let i = 0; i < loopMax; i++) {
      const randomWord: string = await getRandomWord();
      if (randomWord !== "undefined") {
        const randomWordDefinition: WordDefinition | null =
          await getWordDefinition(randomWord);
        if (
          randomWordDefinition &&
          !filter.isProfane(randomWordDefinition.word)
        ) {
          setSolutionWordDefinition(randomWordDefinition);
          return;
        }
      }
    }

    showBoundary("Could not get solution word.");
  };

  const isInputWordValid = async (currentRow: number) => {
    if (solutionWordDefinition) {
      const inputWord = inputLetters[currentRow].join("").replace(/ /g, "");
      if (
        inputWord.toUpperCase() === solutionWordDefinition.word.toUpperCase()
      ) {
        handleGameOver({ guessed: true });
        return true;
      }
      if (inputWord.length === wordLength) {
        const getInputWordDefinition: WordDefinition | null =
          await getWordDefinition(inputWord);

        if (getInputWordDefinition) {
          //input word is valid (5 letters and def)
          if (currentRow === numberOfTries - 1) {
            handleGameOver({ guessed: false });
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
    if (!solutionWordDefinition) {
      throw new Error("Solution word unreachable.");
    }

    const inputWord = inputLetters[rowIndex];
    const solutionWord = solutionWordDefinition.word.toLocaleUpperCase();

    return inputWord.map((inputLetter, inputLetterIndex) => {
      if (!solutionWord.includes(inputLetter)) {
        //the letter is not in the solution
        return "letter-no";
      }
      if (solutionWord[inputLetterIndex] === inputLetter) {
        //the letter is in the solution and in the correct spot
        return "letter-correct";
      }
      //the letter is in the solution, but in the wrong spot

      const letterInWrongSpotIndexes = inputWord
        .map((letter, i) =>
          letter === inputLetter && letter !== solutionWord[i] ? i : -1
        )
        .filter((i) => i >= 0);

      const letterInCorrectSpotCount = inputWord.filter(
        (letter, i) => letter === inputLetter && letter === solutionWord[i]
      ).length;

      const letterInSolutionCount = solutionWord.split(inputLetter).length - 1;

      const letterIndexesToMarkWrong = letterInWrongSpotIndexes.slice(
        0,
        letterInSolutionCount - letterInCorrectSpotCount
      );

      if (letterIndexesToMarkWrong.includes(inputLetterIndex)) {
        return "letter-wrong";
      }

      return "letter-no";
    });
  };

  const handleGameOver = ({ guessed }: { guessed: boolean }) => {
    setIsGameOver(true);
    setStatistics([
      ...statistics,
      {
        guessed,
        guessedAt: guessed ? currentRow + 1 : undefined,
      },
    ]);
  };

  const resetGame = () => {
    setIsLoading(true);
    setIsGameOver(false);
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
        solutionWordDefinition,
        isWordInvalidWarning,
        isInputWordValid,
        compareInputAndSolution,
        isFetching,
        setIsFetching,
        isGameOver,
        resetGame,
        getSolutionWithDefinition,
        isLoading,
        setIsLoading,
        isHowToPlayModalOpen,
        setIsHowToPlayModalOpen,
        isStatisticsModalOpen,
        setIsStatisticsModalOpen,
        statistics,
        clearInvalidWordWarningTimeout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
