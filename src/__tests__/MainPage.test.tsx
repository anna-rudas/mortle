import MainPage from "../components/pages/MainPage/MainPage";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import AppContextProvider from "../context/context";
import { mockSolutionWord } from "../__mocks__/solutionWordDefinitionMocks";
import { getWordFromDatabase, isWordInDatabase } from "../firestore/firestore";

jest.mock("../firestore/firestore", () => ({
  ...jest.requireActual("../firestore/firestore"),
  isWordInDatabase: jest.fn(),
  getWordFromDatabase: jest.fn(),
}));

describe("colors letters correctly (solution: mockSolutionWord)", () => {
  beforeEach(() => {
    (getWordFromDatabase as jest.Mock).mockResolvedValue(mockSolutionWord);

    (isWordInDatabase as jest.Mock).mockResolvedValue(true);
  });

  jest.setTimeout(10000);

  test("handles double letters in input correctly (input: HHHHH)", async () => {
    const { getAllByTestId, getByTestId } = render(
      <AppContextProvider>
        <MainPage />
      </AppContextProvider>
    );

    await waitFor(() => {
      const loadingText = screen.queryByText("Loading");
      //check that app is finished loading
      expect(loadingText).toBeNull();
    });

    const firstRowContainers = getAllByTestId("row-0");
    const firstRowInputs = firstRowContainers.map((rowItem) => {
      return within(rowItem).getByRole("textbox");
    });
    const keyboardLetterContainerH = getByTestId("keyboardLetterContainer-H");

    //does not matter where the focus is
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });

    await waitFor(() => {
      expect((firstRowInputs[0] as HTMLInputElement).value).toBe("H");
      expect((firstRowInputs[1] as HTMLInputElement).value).toBe("H");
      expect((firstRowInputs[2] as HTMLInputElement).value).toBe("H");
      expect((firstRowInputs[3] as HTMLInputElement).value).toBe("H");
      expect((firstRowInputs[4] as HTMLInputElement).value).toBe("H");
    });

    fireEvent.keyDown(firstRowInputs[0], {
      key: "Enter",
    });

    await waitFor(() => {
      expect(firstRowContainers[0].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[1].classList.contains("letter-correct")).toBe(
        true
      );
      expect(firstRowContainers[2].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[3].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[4].classList.contains("letter-no")).toBe(true);

      expect(
        keyboardLetterContainerH.classList.contains("letter-correct")
      ).toBe(true);
    });
  });

  test("handles double letters correctly (input: HXHHH)", async () => {
    const { getAllByTestId, getByTestId } = render(
      <AppContextProvider>
        <MainPage />
      </AppContextProvider>
    );

    await waitFor(() => {
      const loadingText = screen.queryByText("Loading");
      //check that app is finished loading
      expect(loadingText).toBeNull();
    });

    const firstRowContainers = getAllByTestId("row-0");
    const firstRowInputs = firstRowContainers.map((rowItem) => {
      return within(rowItem).getByRole("textbox");
    });
    const keyboardLetterContainerH = getByTestId("keyboardLetterContainer-H");
    const keyboardLetterContainerX = getByTestId("keyboardLetterContainer-X");

    //does not matter where the focus is
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "x",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });

    await waitFor(() => {
      expect((firstRowInputs[0] as HTMLInputElement).value).toBe("H");
      expect((firstRowInputs[1] as HTMLInputElement).value).toBe("X");
      expect((firstRowInputs[2] as HTMLInputElement).value).toBe("H");
      expect((firstRowInputs[3] as HTMLInputElement).value).toBe("H");
      expect((firstRowInputs[4] as HTMLInputElement).value).toBe("H");
    });

    fireEvent.keyDown(firstRowInputs[0], {
      key: "Enter",
    });

    await waitFor(() => {
      expect(firstRowContainers[0].classList.contains("letter-wrong")).toBe(
        true
      );
      expect(firstRowContainers[1].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[2].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[3].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[4].classList.contains("letter-no")).toBe(true);

      expect(keyboardLetterContainerH.classList.contains("letter-wrong")).toBe(
        true
      );
      expect(keyboardLetterContainerX.classList.contains("letter-no")).toBe(
        true
      );
    });
  });
});
