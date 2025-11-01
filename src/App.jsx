import React from "react";
import Board from "./Board";
import "./index.css";

function App() {
  return (
    <div className="app-shell">
      <div className="app-card">
        <header className="app-header">
          <h1 className="title text-glow">Tic Tac Toe</h1>
          <div className="subtitle">React . Two-players</div> </header>

          <main className="game-area">
            <Board />
          </main>

          <footer className="footer">
            Buit with React - follow step-by-step to add featues </footer>
            </div>
            </div>
  );
}

export default App;