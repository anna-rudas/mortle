export type StatsData = {
  guessed: boolean;
  guessedAt?: number;
};

export type WordDefinition = {
  word: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{ definition: string }>;
  }>;
};

export type LetterColorClass = "letter-correct" | "letter-wrong" | "letter-no";
