import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault); // state to handle board
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 }); // state to keep track of current attempts 
  const [wordSet, setWordSet] = useState(new Set()); // state to handle the set of words
  const [correctWord, setCorrectWord] = useState(""); // state to keep track of correct word
  const [disabledLetters, setDisabledLetters] = useState([]); // state to kepe track of changes in the on-screen keyboard
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  }); // state to keep track if the game is over

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  // handle outcome of each attempt by the user
  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";

    // get the current word the user has entered
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i].toLowerCase();
    }

    // see if the word exists in the set
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }
    // if the word entered is the correct word the player wins
    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    console.log(currAttempt);

    // if the player uses all 5 attempts and does not guess the word the player loses
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };
// remove letters from the board
  const onDelete = () => {

    if (currAttempt.letter === 0) return;

    // update the board after the user deletes letter
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  // add letters to the board
  const onSelectLetter = (key) => {

    // update the board after the user has selected a letter or pressed a button 
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;

    // update new board every single time
    setBoard(newBoard);

    
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">

      <nav>
        <h1>Wordle</h1>
      </nav>

      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <Board />

          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
