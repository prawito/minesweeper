import './App.css'
import Board from './Board'

function App() {

  return (
    <div className="app">
      <h1>Minesweeper</h1>
      <Board width={10} height={10} mines={10} />
    </div>
  );
}

export default App
