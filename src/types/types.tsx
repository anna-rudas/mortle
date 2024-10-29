export type StatsData = {
  guessed: boolean;
  guessedAt?: number;
};

export type WordWithDefinition = {
  word: string;
  meanings: Array<{
    partOfSpeech: string;
    definition: string;
  }>;
};

export type LetterColorClass = "letter-correct" | "letter-wrong" | "letter-no";
