import React, { ReactNode, createContext, useState } from "react";
import { wordLength, numberOfTries } from "./constants";
import { WordDefinition } from "./types";

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

  const setInputLetterValue = (newVal: string, isPrevVal?: boolean) => {
    const tempInputLetters: string[][] = [...inputLetters];
    if (isPrevVal) {
      tempInputLetters[currentRow][currentColumn - 1] = newVal;
    } else {
      tempInputLetters[currentRow][currentColumn] = newVal;
    }
    setInputLetters(tempInputLetters);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
