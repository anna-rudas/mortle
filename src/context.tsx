import React, { ReactNode, createContext, useState } from "react";

interface AppContextInterface {
  currentRow: number;
  setCurrentRow: (value: number) => void;
  currentColumn: number;
  setCurrentColumn: (value: number) => void;
}

const defaultContextValue: AppContextInterface = {
  currentRow: 0,
  setCurrentRow: () => {},
  currentColumn: 0,
  setCurrentColumn: () => {},
};

export const AppContext =
  createContext<AppContextInterface>(defaultContextValue);

type AppContextProviderProps = { children?: ReactNode };

function AppContextProvider({ children }: AppContextProviderProps) {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);

  return (
    <AppContext.Provider
      value={{
        currentRow,
        setCurrentRow,
        currentColumn,
        setCurrentColumn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
