import { useEffect } from "react";
import TicTacToe from "./components/TicTacToe/TicTacToe.jsx";

// body[data-task] is used by styles/base.css for this task's page background.
const TASK_ID = "11";

export default function App() {
  useEffect(() => {
    document.body.dataset.task = TASK_ID;
    return () => { delete document.body.dataset.task; };
  }, []);

  return (
    <main className="page">
      <div className="page-head">
        <span className="task-chip">Task 11</span>
        <h1 className="page-title">Tic Tac Toe Game</h1>
        <p className="page-sub">Play the classic game of Tic Tac Toe against a friend or the computer.</p>
      </div>
      <TicTacToe />
    </main>
  );
}
