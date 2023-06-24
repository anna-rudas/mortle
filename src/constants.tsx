import React from "react";
import EnterIcon from "./icons/EnterIcon";
import BackspaceIcon from "./icons/BackspaceIcon";

export const keyboardLetters = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [<EnterIcon />, "Z", "X", "C", "V", "B", "N", "M", <BackspaceIcon />],
];

export const howToPlayContent = [
  {
    exampleWord: "QUEER",
    explanation: "The letter is in the word and in the correct spot.",
  },
  {
    exampleWord: "PROUD",
    explanation: "The letter is in the word but in the wrong spot.",
  },
  {
    exampleWord: "LEAVE",
    explanation: "The letter is not in the word in any spot.",
  },
];

export const howToPlayClassNames = [
  "letter-correct",
  "letter-wrong",
  "letter-no",
];
