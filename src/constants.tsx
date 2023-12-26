import React from "react";
import EnterIcon from "./icons/EnterIcon";
import BackspaceIcon from "./icons/BackspaceIcon";
import { StatsData } from "./types";

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
    exampleWord: "LOVES",
    explanation: "The letter is in the word but in the wrong spot.",
  },
  {
    exampleWord: "BASIL",
    explanation: "The letter is not in the word in any spot.",
  },
];

export const howToPlayClassNames = [
  "letter-correct",
  "letter-wrong",
  "letter-no",
];

export const dummyData: StatsData = [
  {
    guessed: true,
    guessedAt: 3,
  },
  {
    guessed: false,
  },
  {
    guessed: true,
    guessedAt: 5,
  },
  {
    guessed: true,
    guessedAt: 1,
  },
  {
    guessed: false,
  },
  {
    guessed: true,
    guessedAt: 3,
  },
  {
    guessed: true,
    guessedAt: 3,
  },
  {
    guessed: true,
    guessedAt: 2,
  },
  {
    guessed: false,
  },
  {
    guessed: false,
  },
  {
    guessed: true,
    guessedAt: 5,
  },
  {
    guessed: true,
    guessedAt: 5,
  },
  {
    guessed: true,
    guessedAt: 5,
  },
  {
    guessed: true,
    guessedAt: 5,
  },
];

export const resultTexts = {
  winFirst: [
    "Oh my god, first try? Congrats!",
    "That's crazy, you got it on the first try!",
  ],
  winLast: ["Phew, that was close.", "Very last minute, but you got it!"],
  winMiddle: ["Nice one!", "You did it!", "Yay, you've guessed it!"],
  lose: ["Aw shucks, better luck next time.", "Well, you tried."],
};
