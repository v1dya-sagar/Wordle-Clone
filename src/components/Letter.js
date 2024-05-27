import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

// each individual letter
function Letter({ letterPos, attemptVal }) {

  const { board, setDisabledLetters, currAttempt, correctWord } = useContext(AppContext);

// get the actual letter
  const letter = board[attemptVal][letterPos];
// for green
  const correct = correctWord.toUpperCase()[letterPos] === letter;
// for yellow
  const almost = 
  !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

// basically used to decide if the letter is correct or not
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  // for grayed out (as to indicate the letter is not present and can't be used anymore)
  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      console.log(letter);
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);


  return (
    // display letter
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
