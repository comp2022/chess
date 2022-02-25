import React, { useEffect, useState } from "react";
import { Board, Coordinate, getValidMoves, PieceColor } from "../../api";
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
    const [ activeCell, setActiveCell ] = useState<Coordinate>();
    const [ colorTurn, setColorTurn ] = useState<PieceColor>('white');
    const [ possibleMoves, setPossibleMoves ] = useState<Coordinate[]>([]);

    const updateBoard = ([ currRow, currCol ]: Coordinate): void => {
        // if the selected move is valid
        if (activeCell && possibleMoves.some(( [pRow, pCol] ) => pRow === currRow && pCol === currCol)) {

            setCurrentBoard(currBoard => {
                // get a deep copy of currentBoard because we cannot modify state directly
                const newBoard = [...currBoard.map(r => [...r])];
                const [activeRow, activeCol] = activeCell;
                // set activePiece to current square
                newBoard[currRow][currCol] = currBoard[activeRow][activeCol];
                newBoard[activeRow][activeCol] = null;
            
                return newBoard;
            });

            setPossibleMoves([]);
            // switch turns
            setColorTurn((color) => {
                return (color === 'white') ? 'black' : 'white';
            });
        } 
    }

    const onClickCell = ([row, col]: Coordinate) => {

        const currentPieceColor = currentBoard[row][col]?.color;

        setActiveCell([row, col]);

        // if the piece and turn are the same colour, set possible moves to all valid moves
        if (colorTurn === currentPieceColor){
            setPossibleMoves(getValidMoves(currentBoard, [ row, col ]));
        } else { // otherwise clear possible moves
            setPossibleMoves([]);
        }

        updateBoard([row, col]);
    }

    useEffect(() => console.log(possibleMoves), [possibleMoves]);

    return <div className={styles.board}>
   
        { currentBoard && currentBoard.map((row, rowIndex) => 
            <div className={styles.row} key={rowIndex}>
                {/* adding temporarily for testing */}
                <span className={styles.cellTag}>{rowIndex}</span>
                { row.map((piece, colIndex) => {
                    const highlighted = possibleMoves.some(([pRow, pCol]) => pRow === rowIndex && pCol === colIndex);

                    return <Cell
                        isBackgroundBlack={(rowIndex + colIndex) % 2 === 1}
                        highlighted={highlighted}
                        key={`${rowIndex} ${colIndex}`}
                        piece={piece} 
                        onClick={() => onClickCell([ rowIndex, colIndex ])}
                    />;
                })}
            </div>
        )}
    </div>;
}