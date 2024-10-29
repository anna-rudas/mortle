import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firestoreConfig";
import { wordsCollectionKey } from "../data/constants";
import { WordWithDefinition } from "../types/types";

export const getWordFromDatabase = async (
  wordId: string
): Promise<WordWithDefinition | null> => {
  const wordRef = doc(db, wordsCollectionKey, wordId);
  const wordSnapshot = await getDoc(wordRef);
  if (wordSnapshot.exists()) {
    const wordResult: WordWithDefinition = {
      word: wordSnapshot.data().word,
      meanings: wordSnapshot.data().meanings,
    };
    return wordResult;
  }
  return null;
};

export const isWordInDatabase = async (
  wordToCheck: string
): Promise<boolean> => {
  const q = query(
    collection(db, wordsCollectionKey),
    where("word", "==", wordToCheck.toLowerCase())
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length !== 0;
};
