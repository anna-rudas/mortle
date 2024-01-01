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
