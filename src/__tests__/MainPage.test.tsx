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
import {
  mockSolutionWordChant,
  mockSolutionWordAlgae,
} from "../__mocks__/solutionWordDefinitionMocks";
import { getWordFromDatabase, isWordInDatabase } from "../firestore/firestore";

jest.mock("../firestore/firestore", () => ({
  ...jest.requireActual("../firestore/firestore"),
  isWordInDatabase: jest.fn(),
  getWordFromDatabase: jest.fn(),
}));

describe("colors letters correctly (solution: CHANT)", () => {
  beforeEach(() => {
    (getWordFromDatabase as jest.Mock).mockResolvedValue(mockSolutionWordChant);

    (isWordInDatabase as jest.Mock).mockResolvedValue(true);
  });

  jest.setTimeout(10000);

  test("handles recoloring letters correctly", async () => {
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

    const secondRowContainers = getAllByTestId("row-1");
    const secondRowInputs = secondRowContainers.map((rowItem) => {
      return within(rowItem).getByRole("textbox");
    });

    const keyboardLetterContainerC = getByTestId("keyboardLetterContainer-C");
    const keyboardLetterContainerH = getByTestId("keyboardLetterContainer-H");
    const keyboardLetterContainerA = getByTestId("keyboardLetterContainer-A");

    //first input: PEACH
    //does not matter where the focus is
    fireEvent.keyDown(firstRowInputs[0], {
      key: "p",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "e",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "c",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "h",
    });

    await waitFor(() => {
      expect((firstRowInputs[0] as HTMLInputElement).value).toBe("P");
      expect((firstRowInputs[1] as HTMLInputElement).value).toBe("E");
      expect((firstRowInputs[2] as HTMLInputElement).value).toBe("A");
      expect((firstRowInputs[3] as HTMLInputElement).value).toBe("C");
      expect((firstRowInputs[4] as HTMLInputElement).value).toBe("H");
    });

    fireEvent.keyDown(firstRowInputs[0], {
      key: "Enter",
    });

    await waitFor(() => {
      //first row
      expect(firstRowContainers[0].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[1].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[2].classList.contains("letter-correct")).toBe(
        true
      );
      expect(firstRowContainers[3].classList.contains("letter-wrong")).toBe(
        true
      );
      expect(firstRowContainers[4].classList.contains("letter-wrong")).toBe(
        true
      );

      //keyboard letters
      expect(keyboardLetterContainerC.classList.contains("letter-wrong")).toBe(
        true
      );
      expect(keyboardLetterContainerH.classList.contains("letter-wrong")).toBe(
        true
      );
      expect(
        keyboardLetterContainerA.classList.contains("letter-correct")
      ).toBe(true);
    });

    //second input: CHART
    //does not matter where the focus is
    fireEvent.keyDown(secondRowInputs[0], {
      key: "c",
    });
    fireEvent.keyDown(secondRowInputs[0], {
      key: "h",
    });
    fireEvent.keyDown(secondRowInputs[0], {
      key: "a",
    });
    fireEvent.keyDown(secondRowInputs[0], {
      key: "r",
    });
    fireEvent.keyDown(secondRowInputs[0], {
      key: "t",
    });

    await waitFor(() => {
      expect((secondRowInputs[0] as HTMLInputElement).value).toBe("C");
      expect((secondRowInputs[1] as HTMLInputElement).value).toBe("H");
      expect((secondRowInputs[2] as HTMLInputElement).value).toBe("A");
      expect((secondRowInputs[3] as HTMLInputElement).value).toBe("R");
      expect((secondRowInputs[4] as HTMLInputElement).value).toBe("T");
    });

    fireEvent.keyDown(secondRowInputs[0], {
      key: "Enter",
    });

    await waitFor(() => {
      //first row
      expect(firstRowContainers[0].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[1].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[2].classList.contains("letter-correct")).toBe(
        true
      );
      expect(firstRowContainers[3].classList.contains("letter-wrong")).toBe(
        true
      );
      expect(firstRowContainers[4].classList.contains("letter-wrong")).toBe(
        true
      );

      //second row
      expect(secondRowContainers[0].classList.contains("letter-correct")).toBe(
        true
      );
      expect(secondRowContainers[1].classList.contains("letter-correct")).toBe(
        true
      );
      expect(secondRowContainers[2].classList.contains("letter-correct")).toBe(
        true
      );
      expect(secondRowContainers[3].classList.contains("letter-no")).toBe(true);
      expect(secondRowContainers[4].classList.contains("letter-correct")).toBe(
        true
      );

      //keyboard letters
      expect(
        keyboardLetterContainerC.classList.contains("letter-correct")
      ).toBe(true);
      expect(
        keyboardLetterContainerH.classList.contains("letter-correct")
      ).toBe(true);
      expect(
        keyboardLetterContainerA.classList.contains("letter-correct")
      ).toBe(true);
    });
  });

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

describe("colors letters correctly (solution: ALGAE)", () => {
  beforeEach(() => {
    (getWordFromDatabase as jest.Mock).mockResolvedValue(mockSolutionWordAlgae);

    (isWordInDatabase as jest.Mock).mockResolvedValue(true);
  });

  jest.setTimeout(10000);

  test("handles double letters in input correctly (input: AAAAA)", async () => {
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
    const keyboardLetterContainerA = getByTestId("keyboardLetterContainer-A");

    //does not matter where the focus is
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });

    await waitFor(() => {
      expect((firstRowInputs[0] as HTMLInputElement).value).toBe("A");
      expect((firstRowInputs[1] as HTMLInputElement).value).toBe("A");
      expect((firstRowInputs[2] as HTMLInputElement).value).toBe("A");
      expect((firstRowInputs[3] as HTMLInputElement).value).toBe("A");
      expect((firstRowInputs[4] as HTMLInputElement).value).toBe("A");
    });

    fireEvent.keyDown(firstRowInputs[0], {
      key: "Enter",
    });

    await waitFor(() => {
      expect(firstRowContainers[0].classList.contains("letter-correct")).toBe(
        true
      );
      expect(firstRowContainers[1].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[2].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[3].classList.contains("letter-correct")).toBe(
        true
      );
      expect(firstRowContainers[4].classList.contains("letter-no")).toBe(true);

      expect(
        keyboardLetterContainerA.classList.contains("letter-correct")
      ).toBe(true);
    });
  });

  test("handles double letters in input correctly (input: AAAXA)", async () => {
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
    const keyboardLetterContainerA = getByTestId("keyboardLetterContainer-A");
    const keyboardLetterContainerX = getByTestId("keyboardLetterContainer-X");

    //does not matter where the focus is
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "x",
    });
    fireEvent.keyDown(firstRowInputs[0], {
      key: "a",
    });

    await waitFor(() => {
      expect((firstRowInputs[0] as HTMLInputElement).value).toBe("A");
      expect((firstRowInputs[1] as HTMLInputElement).value).toBe("A");
      expect((firstRowInputs[2] as HTMLInputElement).value).toBe("A");
      expect((firstRowInputs[3] as HTMLInputElement).value).toBe("X");
      expect((firstRowInputs[4] as HTMLInputElement).value).toBe("A");
    });

    fireEvent.keyDown(firstRowInputs[0], {
      key: "Enter",
    });

    await waitFor(() => {
      expect(firstRowContainers[0].classList.contains("letter-correct")).toBe(
        true
      );
      expect(firstRowContainers[1].classList.contains("letter-wrong")).toBe(
        true
      );
      expect(firstRowContainers[2].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[3].classList.contains("letter-no")).toBe(true);
      expect(firstRowContainers[4].classList.contains("letter-no")).toBe(true);

      expect(
        keyboardLetterContainerA.classList.contains("letter-correct")
      ).toBe(true);
      expect(keyboardLetterContainerX.classList.contains("letter-no")).toBe(
        true
      );
    });
  });
});
