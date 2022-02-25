import React, { useEffect, useState } from "react";
import { Board, Coordinate, getValidMoves } from "../../api";
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
export const BoardComponent: React.FC<BoardProps> = ({ board }) => {    
    const [ currentBoard, setCurrentBoard ] = useState<Board>(board);
    const [ possibleMoves, setPossibleMoves ] = useState<Coordinate[]>([]);

    useEffect(() => console.log(possibleMoves), [possibleMoves]);

    return <div className={styles.board}>
   
        { currentBoard && currentBoard.map((row, rowIndex) => 
            <div className={styles.row} key={rowIndex}>
                {/* adding temporarily for testing */}
                <span className={styles.cellTag}>{rowIndex}</span>
                { row.map((piece, colIndex) => {
                    const highlighted = possibleMoves.some(({row: pRow, col: pCol}) => pRow === rowIndex && pCol === colIndex);
                    return <Cell
                        isBlack={(rowIndex + colIndex) % 2 === 1}
                        highlighted={highlighted}
                        key={`${rowIndex} ${colIndex}`}
                        piece={piece} 
                        onClick={() => {
                            setPossibleMoves(getValidMoves(currentBoard, { row: rowIndex, col: colIndex }));
                            console.log(rowIndex, colIndex)
                        }}
                    />;
                })}
            </div>
        )}
    </div>;
}