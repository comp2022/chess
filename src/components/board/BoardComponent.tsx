import React, { useEffect, useState } from "react";
import { Board, Coordinate, getValidMoves, PieceColor } from "../../api";
import useSound from "use-sound";
import styles from './Board.module.scss';
import { Cell } from "./Cell";

// sound fx
import moveSound from '../../assets/sounds/move.mp3';
import captureSound from '../../assets/sounds/capture.mp3';

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
    const [ playerView, setPlayerView ] = useState<PieceColor>('white');

    const [ playMove ] = useSound(moveSound);
    const [ playCapture ] = useSound(captureSound);

    const updateBoard = (coord: Coordinate): void => {
        const [ currRow, currCol ] = coord;

        // if the selected move is valid
        if (activeCell && possibleMoves.some(( [pRow, pCol] ) => pRow === currRow && pCol === currCol)) {

            // play sounds
            if(currentBoard[currRow][currCol] !== null) playCapture();
            else playMove();
            
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
   
        { currentBoard && currentBoard.map((_, absoluteRowIndex) => {

            // reverse the rows if viewing from white side
            const relativeRowIndex = playerView === 'white' ? 8 - absoluteRowIndex - 1 : absoluteRowIndex;
            
            return <div className={styles.row} key={relativeRowIndex}>
                { currentBoard[relativeRowIndex].map((_, absoluteColIndex) => {
                    // reverse the columns if viewing from black side            
                    const relativeColIndex = playerView === 'black' ? 8 - absoluteColIndex - 1 : absoluteColIndex;

                    // the piece to be displayed in this cell (relative)
                    const piece = currentBoard[relativeRowIndex][relativeColIndex];
                    const cellHasPieceOfCurrentTurn = piece?.color === colorTurn;
                    const cellIsActive = activeCell?.[0] === relativeRowIndex && activeCell?.[1] === relativeColIndex;

                    const isHighlighted = cellHasPieceOfCurrentTurn && cellIsActive;
                    const moveHint = possibleMoves.some(([ pRow, pCol ]) => pRow === relativeRowIndex && pCol === relativeColIndex);

                    return <Cell
                        isBackgroundBlack={(relativeRowIndex + relativeColIndex) % 2 === 0}
                        moveHint={moveHint}
                        isHighlighted={isHighlighted}
                        key={`${relativeRowIndex} ${relativeColIndex}`}
                        piece={piece} 
                        onClick={() => onClickCell([ relativeRowIndex, relativeColIndex ])}
                    />;
                })}
            </div>
        })}
    </div>;
}