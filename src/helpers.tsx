import { StatsData, WordDefinition } from "./types";
import { wordDefTest } from "./test/test-data";
import { statisticsKey, wordLength } from "./constants";

export const getWordDefinitionTest = (): WordDefinition => {
  return wordDefTest;
};

export async function getRandomWord(): Promise<string> {
  return fetch(
    `https://random-word-api.herokuapp.com/word?length=${wordLength}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data[0];
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getWordDefinition = async (
  wordToCheck: string
): Promise<WordDefinition | null> => {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`)
    .then((response) => response.json())
    .then((data) => data[0] || null)
    .catch((error) => {
      console.error(error);
    });
};

export const className = (...classNames: (string | null | undefined)[]) => {
  return {
    className: classNames.filter(Boolean).join(" "),
  };
};

export const getStats = (): StatsData[] => {
  return JSON.parse(localStorage.getItem(statisticsKey) || "[]");
};

export const saveStats = (statsToSave: StatsData[]) => {
  localStorage.setItem(statisticsKey, JSON.stringify(statsToSave));
};
