import GameMonsterMouth from "../components/monsterbody-elements/GameMonsterMouth/GameMonsterMouth";
import MainPage from "../components/pages/MainPage/MainPage";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppContextProvider from "../context/context";
import { mockSolutionWord } from "../__mocks__/solutionWordDefinitionMocks";
import { getWordFromDatabase } from "../firestore/firestore";

jest.mock("../firestore/firestore", () => ({
  ...jest.requireActual("../firestore/firestore"),
  getWordFromDatabase: jest.fn(),
}));

describe(GameMonsterMouth, () => {
  beforeEach(() => {
    (getWordFromDatabase as jest.Mock).mockResolvedValue(mockSolutionWord);
  });

  jest.setTimeout(10000);

  test("handles keyboard inputs correctly", async () => {
    const { getAllByTestId } = render(
      <AppContextProvider>
        <GameMonsterMouth />
        <MainPage />
      </AppContextProvider>
    );

    await waitFor(() => {
      const loadingText = screen.queryByText("Loading");
      //check that app is finished loading
      expect(loadingText).toBeNull();
    });

    const rowInputs = getAllByTestId("toothInput");
    //does not matter where the focus is
    fireEvent.keyDown(rowInputs[0], { key: "c" });
    fireEvent.keyDown(rowInputs[0], { key: "h" });
    fireEvent.keyDown(rowInputs[0], { key: "a" });

    await waitFor(() => {
      expect((rowInputs[0] as HTMLInputElement).value).toBe("C");
      expect((rowInputs[1] as HTMLInputElement).value).toBe("H");
      expect((rowInputs[2] as HTMLInputElement).value).toBe("A");
    });

    fireEvent.keyDown(rowInputs[0], {
      key: "Backspace",
      code: "Backspace",
      charCode: 8,
    });

    await waitFor(() => {
      expect((rowInputs[0] as HTMLInputElement).value).toBe("C");
      expect((rowInputs[1] as HTMLInputElement).value).toBe("H");
      expect((rowInputs[2] as HTMLInputElement).value).toBe("");
    });
  });
});
