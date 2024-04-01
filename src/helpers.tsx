import { LetterColorClass, WordDefinition } from "./types";
import { wordDefTest } from "./test/test-data";
import { wordLength } from "./constants";

export const getWordDefinitionTest = (): WordDefinition => {
  return wordDefTest;
};

export const checkInputWord = async (
  currentRow: number,
  inputLetters: readonly string[][],
  solutionWordDef: WordDefinition | null
) => {
  const inputWord = inputLetters[currentRow];

  if (inputWord.join("").toUpperCase() == solutionWordDef?.word.toUpperCase()) {
    //input is the solution
    //TODO: game over
    return true;
  } else if (inputWord.join("").split("").length == wordLength) {
    // const getInputWordDef: WordDefinition | null = await getWordDefinition(
    //   inputWord.join("")
    // );

    const getInputWordDef: WordDefinition | null = getWordDefinitionTest();

    if (getInputWordDef) {
      //input word is valid (5 letters and def)
      return true;
    } else {
      //input word is not valid (no def)
      return false;
    }
  } else {
    //input word is not valid (not 5 letters)
    return false;
  }
};

export const compareInputAndSolution = (
  rowIndex: number,
  inputLetters: readonly string[][],
  solutionWordDef: WordDefinition | null
): LetterColorClass[] => {
  if (solutionWordDef === null) {
    throw new Error("unreachable");
  }
  //TODO error

  const inputWord = inputLetters[rowIndex];
  const solutionWord = solutionWordDef.word.toLocaleUpperCase();

  return inputWord.map((inputLetter, inputLetterIndex) => {
    if (solutionWord.indexOf(inputLetter) < 0) {
      return "letter-no";
    } else if (solutionWord[inputLetterIndex] == inputLetter) {
      return "letter-correct";
    } else {
      //the letter is in the solution, but in the wrong spot

      const incorrectIndexes = [];
      let correctTimesInSolution = 0;

      for (let j = 0; j < inputWord.length; j++) {
        if (inputWord[j] === inputLetter) {
          if (inputWord[j] === solutionWord[j]) {
            correctTimesInSolution++;
          } else {
            incorrectIndexes.push(j);
          }
        }
      }

      const timesInSolution = solutionWord.split(inputLetter).length - 1;
      const wrongTimesInInput = timesInSolution - correctTimesInSolution;

      for (let j = 0; j < incorrectIndexes.length; j++) {
        if (inputLetterIndex === incorrectIndexes[j]) {
          if (j < wrongTimesInInput) {
            return "letter-wrong";
          } else {
            return "letter-no";
          }
        }
      }
    }
    return "letter-no";
  });
};

export const className = (...classNames: (string | null | undefined)[]) => {
  return {
    className: classNames.filter(Boolean).join(" "),
  };
};
