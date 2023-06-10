import Cell from "../Cell";
import { useEffect, useState } from "react";

const generateBoard = (width, height, mines) => {
    // Initialize empty board
    let board = Array(height)
      .fill()
      .map(() =>
        Array(width).fill({ value: 0, revealed: false, flagged: false })
      );
  
    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      let x = Math.floor(Math.random() * width);
      let y = Math.floor(Math.random() * height);
      if (board[y][x].value !== "M") {
        board[y][x] = { value: "M", revealed: false, flagged: false };
        minesPlaced++;
      }
    }
  
    // Calculate adjacent mines
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (board[y][x].value !== "M") {
          let mines = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              let ny = y + dy;
              let nx = x + dx;
              if (
                ny >= 0 &&
                ny < height &&
                nx >= 0 &&
                nx < width &&
                board[ny][nx].value === "M"
              ) {
                mines++;
              }
            }
          }
          board[y][x] = { value: mines, revealed: false, flagged: false };
        }
      }
    }
  
    return board;
  };

// eslint-disable-next-line react/prop-types
const Board = ({ width, height, mines }) => {
    const [board, setBoard] = useState(generateBoard(width, height, mines));
    const [gameOver, setGameOver] = useState(false);
  
    const reset = () => {
      setGameOver(false);
      setBoard(generateBoard(width, height, mines));
    };
  
    useEffect(() => {
      setBoard(generateBoard(width, height, mines));
    }, [width, height, mines]);
  
    const handleClick = (x, y) => {
      let newBoard = JSON.parse(JSON.stringify(board));
  
      if (newBoard[y][x].value === "M") {
        for (let row = 0; row < height; row++) {
          for (let col = 0; col < width; col++) {
            if (newBoard[row][col].value === "M") {
              newBoard[row][col].flagged = true;
            }
          }
        }
        setGameOver(true);
        setBoard(newBoard);
        return;
      }
  
      const reveal = (x, y) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return;
        if (newBoard[y][x].revealed) return;
  
        newBoard[y][x].revealed = true;
  
        if (newBoard[y][x].value === 0) {
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              reveal(x + dx, y + dy);
            }
          }
        }
      };
  
      reveal(x, y);
      setBoard(newBoard);
    };
  
    const handleContextMenu = (x, y) => {
      let newBoard = JSON.parse(JSON.stringify(board));
  
      newBoard[y][x].flagged = !newBoard[y][x].flagged;
  
      setBoard(newBoard);
    };

    console.log(board);
  
    return (
      <div>
        <div>
          {board.map((row, y) => (
            <div key={y} className="board-row">
              {row.map((cell, x) => (
                <Cell
                  key={x}
                  value={cell.value}
                  revealed={cell.revealed}
                  flagged={cell.flagged}
                  onClick={() => handleClick(x, y)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleContextMenu(x, y);
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        {gameOver && (
            <div className="game-over">
                <p>Game Over</p>
                <button onClick={reset}>Refresh</button>
            </div>
        )}
      </div>
    );
  };

export default Board;