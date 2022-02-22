import React, { useState } from "react";
import { Board, getValidMoves } from "../../api/Chess";
import styles from './Board.module.scss';
import { Cell } from "./Cell";

const BOARD_SIZE = 8;

// prop types for our component!
export interface BoardProps { 
    board: Board
}

/**
 * Placeholder. ONLY USED TO DISPLAY EXAMPLE BOARD. TO BE THROWN OUT LATER
 * 
 * @returns A blank chess board of size BOARD_SIZE (8).
 */
// const getBlankBoard = (): number[][] => {
//     return Array.from({ length: BOARD_SIZE }).map(_ => Array.from({ length: BOARD_SIZE }).map(__ => 0));
// }

/**
 * The chess board. Has no control over the game itself, just current board state.
 */
// FC stands for Functional Component. This function returns a Functional Components with the props of BoardProps
export const BoardComponent: React.FC<BoardProps> = (board) => {    
    const [ currentBoard, setCurrentBoard ] = useState(board);

    return <div className={styles.board}>
   
        { currentBoard && currentBoard.board.map((row, rowIndex) => 
                <div className={styles.row} key={rowIndex}>
                    {/* adding temporarily for testing */}
                    <span className={styles.cellTag}>{rowIndex}</span>
                    {row.map((piece, colIndex) => <Cell
                        isBlack={(rowIndex + colIndex) % 2 === 1}
                        key={`${rowIndex} ${colIndex}`}
                        piece={piece} />
                    )}
                </div>
        )}
    </div>;
}