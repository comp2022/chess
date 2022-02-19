import React, { useState } from "react";
import styles from './Board.module.scss';
import { Cell } from "./Cell";

const BOARD_SIZE = 8;

// prop types for our component!
export interface BoardProps { 

}

/**
 * Placeholder. ONLY USED TO DISPLAY EXAMPLE BOARD. TO BE THROWN OUT LATER
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
export const Board: React.FC<BoardProps> = () => {    
    const [ board, setBoard ] = useState(getBlankBoard());
    
    return <div className={styles.board}>
        { board && board.map((row, rowIndex) => 
            <div className={styles.row} key={rowIndex}>
                { row.map((cell, colIndex) =>
                    <Cell 
                        isBlack={(rowIndex + colIndex) % 2 === 1}
                        key={`${rowIndex} ${colIndex}`} 
                    /> 
                )}
            </div>
        )}
    </div>;
}