import wordBank from "./wordle-bank.txt";


// default values of the board when its initialized
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      // convert the text file that has 1 word in each line into an array of words
      const wordArr = result.split("\n");
      // generate random number and choose todaysWord randomly 
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      console.log(todaysWord);

      // use set instead of using array to look up the currWord
      wordSet = new Set(wordArr);
    });

    // todays word is the word to be guessed
  return { wordSet, todaysWord };
};
