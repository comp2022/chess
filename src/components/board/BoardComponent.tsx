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
    const [ activeCell, setActiveCell ] = useState<Coordinate>();
    const [ isBlackTurn, setIsBlackTurn ] = useState<Boolean>(false);
    const [ possibleMoves, setPossibleMoves ] = useState<Coordinate[]>([]);

    const updateBoard = (currentMove: Coordinate): void => {
        // if the selected move is valid
        if (activeCell && possibleMoves.some(({row: pRow, col: pCol}) => pRow === currentMove.row && pCol === currentMove.col)) {

            setCurrentBoard(currBoard => {
                // get a deep copy of currentBoard because we cannot modify state directly
                const newBoard = [...currBoard.map(r => [...r])];
                // set activePiece to current square
                newBoard[currentMove.row][currentMove.col] = currBoard[activeCell.row][activeCell.col];
                newBoard[activeCell.row][activeCell.col] = null;
            
                return newBoard;
            });

            setPossibleMoves([]);
            // switch turns
            setIsBlackTurn((isBlackTurn) =>  !isBlackTurn);
        } 
    }

    const onClickCell = (coord: Coordinate) => {
        const { row, col } = coord;
        const pieceIsBlack = currentBoard[row][col]?.isBlack;

        setActiveCell(coord);

        // if the piece and turn are the same colour, set possible moves to all valid moves
        if (isBlackTurn === pieceIsBlack){
            setPossibleMoves(getValidMoves(currentBoard, coord));
        } else { // otherwise clear possible moves
            setPossibleMoves([]);
        }

        updateBoard(coord);
    }

    useEffect(() => console.log(possibleMoves), [possibleMoves]);

    return <div className={styles.board}>
   
        { currentBoard && currentBoard.map((row, rowIndex) => 
            <div className={styles.row} key={rowIndex}>
                {/* adding temporarily for testing */}
                <span className={styles.cellTag}>{rowIndex}</span>
                { row.map((piece, colIndex) => {
                    const highlighted = possibleMoves.some(({row: pRow, col: pCol}) => pRow === rowIndex && pCol === colIndex);
                    const cellCoordinate: Coordinate = { row: rowIndex, col: colIndex };

                    return <Cell
                        isBackgroundBlack={(rowIndex + colIndex) % 2 === 1}
                        highlighted={highlighted}
                        key={`${rowIndex} ${colIndex}`}
                        piece={piece} 
                        onClick={() => onClickCell(cellCoordinate)}
                    />;
                })}
            </div>
        )}
    </div>;
}