import React, { useState } from "react";
import styles from './Board.module.scss';
import { Cell } from "./Cell";

const BOARD_SIZE = 8;

// prop types for our component!
export interface BoardProps { 
    // function to fire when a cell is clicked
    onCellClick?: (row: number, col: number) => void;
}

/**
 * Placeholder.
 * 
 * @returns A blank chess board of size BOARD_SIZE (8).
 */
const getBlankBoard = (): number[][] => {
    return Array.from({ length: BOARD_SIZE }).map(_ => Array.from({ length: BOARD_SIZE }).map(__ => 0));
}

/**
 * The chess board. Has no control over the game itself, just current board state.
 */
// FC stands for Functional Component. This function returns a Functional Components with the props of BoardProps
export const Board: React.FC<BoardProps> = ({ onCellClick }) => {    
    const [ board, setBoard ] = useState(getBlankBoard());
    
    return <div className={styles.board}>
        { board && board.map((row, rowIndex) => 
            <div className={styles.row} key={rowIndex}>
                { row.map((cell, colIndex) =>
                    <Cell 
                        row={rowIndex} 
                        col={colIndex} 
                        onClick={onCellClick ?? console.log} 
                        key={`${rowIndex} ${colIndex}`} 
                    /> 
                )}
            </div>
        )}
    </div>;
}