import React from 'react';
import './App.scss';
import { Board } from './components/board/Board';

function App() {
  // we might not need this listener at this level, but its good for demonstration
  const onCellClick = (row: number, col: number) => console.log(row, col);

  return <div id="app">
    <Board onCellClick={onCellClick}/>
  </div>;
}

export default App;
