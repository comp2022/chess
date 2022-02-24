import React, { useEffect, useState } from "react";
import { Board, Coordinate, getValidMoves } from "../../api/Chess";
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
    const [ previousMove, setpreviousMove ] = useState<Coordinate>();
    const [ invokeMove, setInvokeMove ] = useState<Boolean>(false);
    const [ isBlackTurn, setIsBlackTurn ] = useState<Boolean>(false);
    const [ possibleMoves, setPossibleMoves ] = useState<Coordinate[]>([]);

    const updateBoard = (currentMove: Coordinate): void => {
        // if the selected move is valid
        if (previousMove && possibleMoves.some(({row: pRow, col: pCol}) => pRow === currentMove.row && pCol === currentMove.col)) {
            currentBoard[currentMove.row][currentMove.col] = currentBoard[previousMove.row][previousMove.col];
            currentBoard[previousMove.row][previousMove.col] = null;
            setCurrentBoard(currentBoard);
            setPossibleMoves([]);
            setIsBlackTurn(!isBlackTurn)
            setInvokeMove(false);
        } 
    }

    // invoke move if we select the chess piece
    const invokeMoves = (move: Coordinate): void => {
        (getValidMoves(currentBoard, move).length) ? setInvokeMove(true) : setInvokeMove(false);
        // store previousMoveious move
        setpreviousMove(move);
    }

    const blackTurn = (move: Coordinate): boolean => {
        // return true if black turn
        return (currentBoard[move.row][move.col] !== null && currentBoard[move.row][move.col]?.isBlack === true);
    }

    useEffect(() => console.log(possibleMoves, "dfs"), [possibleMoves]);

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
                            if (isBlackTurn === blackTurn({ row: rowIndex, col: colIndex })){
                                invokeMoves({ row: rowIndex, col: colIndex })
                                setPossibleMoves(getValidMoves(currentBoard, { row: rowIndex, col: colIndex }))
                            }
                            if (invokeMove) {
                                updateBoard({ row: rowIndex, col: colIndex });
                            } 
                        }}
                    />;
                })}
            </div>
        )}
    </div>;
}