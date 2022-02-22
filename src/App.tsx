import React from 'react';
import './App.scss';
import { BoardComponent } from './components/board/BoardComponent';
import state from './api/boardstates/default.json';
import { Board, convertRawToBoard } from './api/Chess';

function App() {
  const initialBoard: Board = convertRawToBoard(state);

  return <div id="app">
    <BoardComponent board={initialBoard}/>
  </div>;
}

export default App;
