import GameMonsterMouth from "../components/monsterbody-elements/GameMonsterMouth/GameMonsterMouth";
import MainPage from "../components/pages/MainPage/MainPage";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppContextProvider from "../context/context";
import { mockSolutionWordWithDefinition } from "../__mocks__/solutionWordDefinitionMock";
import { getWordFromDatabase } from "../firestore/firestore";

jest.mock("../firestore/firestore", () => ({
  ...jest.requireActual("../firestore/firestore"),
  getWordFromDatabase: jest.fn(),
}));

describe(GameMonsterMouth, () => {
  beforeEach(() => {
    (getWordFromDatabase as jest.Mock).mockResolvedValue(
      mockSolutionWordWithDefinition
    );
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

    const toothInputs = getAllByTestId("toothInput");
    //does not matter where the focus is
    fireEvent.keyDown(toothInputs[0], { key: "c", code: "KeyC", charCode: 67 });
    fireEvent.keyDown(toothInputs[0], { key: "h", code: "KeyH", charCode: 72 });
    fireEvent.keyDown(toothInputs[0], { key: "a", code: "KeyA", charCode: 65 });

    await waitFor(() => {
      expect((toothInputs[0] as HTMLInputElement).value).toBe("C");
      expect((toothInputs[1] as HTMLInputElement).value).toBe("H");
      expect((toothInputs[2] as HTMLInputElement).value).toBe("A");
    });

    fireEvent.keyDown(toothInputs[0], {
      key: "Backspace",
      code: "Backspace",
      charCode: 8,
    });

    await waitFor(() => {
      expect((toothInputs[0] as HTMLInputElement).value).toBe("C");
      expect((toothInputs[1] as HTMLInputElement).value).toBe("H");
      expect((toothInputs[2] as HTMLInputElement).value).toBe("");
    });
  });
});
