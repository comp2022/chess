import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
ReactDOM.render(
  <React.StrictMode>
    {/* 
      must add this for react-dnd library to work
      https://react-dnd.github.io/react-dnd/docs/api/dnd-provider
    */}
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);