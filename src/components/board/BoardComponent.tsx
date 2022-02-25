import React, { useEffect, useState } from "react";
import { Board, Coordinate, getValidMoves, PieceColor } from "../../api";
import styles from './Board.module.scss';
import { Cell } from "./Cell";

// prop types for our component!
export interface BoardProps { 
    board: Board
}

/*
 * The chess board. Has no control over the game itself, just current board state.
 */
// FC stands for Functional Component. This function returns a Functional Components with the props of BoardProps
export const BoardComponent: React.FC<BoardProps> = ({ board }) => {    
    const [ currentBoard, setCurrentBoard ] = useState<Board>(board);
    const [ activeCell, setActiveCell ] = useState<Coordinate>();
    const [ colorTurn, setColorTurn ] = useState<PieceColor>('white');
    const [ possibleMoves, setPossibleMoves ] = useState<Coordinate[]>([]);

    const updateBoard = (coord: Coordinate): void => {
        const [ currRow, currCol ] = coord;
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

    const onClickCell = (coord: Coordinate) => {
        const [ row, col ] = coord;
        const currentPieceColor = currentBoard[row][col]?.color;

        setActiveCell(coord);

        // if the piece and turn are the same colour, set possible moves to all valid moves
        if (colorTurn === currentPieceColor){
            setPossibleMoves(getValidMoves(currentBoard, [ row, col ]));
        } else { // otherwise clear possible moves
            setPossibleMoves([]);
        }

        updateBoard(coord);
    }

    useEffect(() => console.log(possibleMoves), [possibleMoves]);

    return <div className={styles.board}>
   
        { currentBoard && currentBoard.map((row, rowIndex) => 
            <div className={styles.row} key={rowIndex}>
                
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