import { numberOfWordsInDatabase } from "../data/constants";

export const className = (...classNames: (string | null | undefined)[]) => {
  return {
    className: classNames.filter(Boolean).join(" "),
  };
};

export const calculatePercentage = (value: number, total: number) => {
  return total == 0 ? 0 : Math.round((value / total) * 100);
};

export const generateRandomWordIndex = (): number => {
  const max = numberOfWordsInDatabase;
  return Math.floor(Math.random() * (max - 0 + 1) + 0);
};
