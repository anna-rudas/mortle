import React, { ReactNode, createContext, useState } from "react";

interface AppContextInterface {
  currentRow: number;
  setCurrentRow: (value: number) => void;
}

const defaultContextValue: AppContextInterface = {
  currentRow: 0,
  setCurrentRow: () => {},
};

export const AppContext =
  createContext<AppContextInterface>(defaultContextValue);

type AppContextProviderProps = { children?: ReactNode };

function AppContextProvider({ children }: AppContextProviderProps) {
  const [currentRow, setCurrentRow] = useState(0);

  return (
    <AppContext.Provider value={{ currentRow, setCurrentRow }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
