import EnterIcon from "../assets/icons/EnterIcon";
import BackspaceIcon from "../assets/icons/BackspaceIcon";
import { LetterColorClass } from "../types/types";

export const wordLength = 5;
export const numberOfTries = 5;
export const statisticsKey = "savedMortleStatistics";
export const wordsCollectionKey = "words";
export const numberOfWordsInDatabase = 6682;

export const generalErrorMsg =
  "Unexpected error. Refresh the page or try again later.";

export const invalidSubmitWarning = "Your guess must be a valid 5 letter word.";

export const keyboardLetters = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [
    <EnterIcon key="enter" />,
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    <BackspaceIcon key="backspace" />,
  ],
];

export const howToPlayContent = [
  {
    exampleWord: "QUEER",
    explanation: "The letter is in the word and in the correct spot.",
  },
  {
    exampleWord: "LOVES",
    explanation: "The letter is in the word but in the wrong spot.",
  },
  {
    exampleWord: "BASIL",
    explanation: "The letter is not in the word in any spot.",
  },
];

export const letterColoringClasses: LetterColorClass[] = [
  "letter-correct",
  "letter-wrong",
  "letter-no",
];
