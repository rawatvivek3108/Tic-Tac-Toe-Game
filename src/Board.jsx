import React, { useState, useEffect } from "react";
import Square from "./Square.jsx";
import Confetti from "react-confetti";
import "./App.css";

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const { width, height } = useWindowSize();

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares).winner) return;
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function calculateWinner(squaresArr) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (
        squaresArr[a] &&
        squaresArr[a] === squaresArr[b] &&
        squaresArr[a] === squaresArr[c]
      ) {
        return { winner: squaresArr[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: [] };
  }

  const { winner, line } = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  const status = winner
    ? `🎉 Winner: ${winner}`
    : isDraw
    ? "🤝 It's a draw!"
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  const showConfetti = typeof window !== "undefined" && !!winner;

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width || window.innerWidth}
          height={height || window.innerHeight}
        />
      )}
      <div className="board-wrapper">
        <h2>{status}</h2>
        <button className="reset-btn" onClick={resetGame}>
          🔁 New Game
        </button>

        <div className="board">
          {squares.map((value, i) => (
            <Square
              key={i}
              value={value}
              onClick={() => handleClick(i)}
              isWinningSquare={line.includes(i)} // ✅ fixed here
            />
          ))}
        </div>
      </div>
    </>
  );
}
