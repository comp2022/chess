import React, { useEffect, useMemo, useState } from "react";
import { Board, convertBoardToFEN, Coordinate, FEN, getValidMoves, PieceColor } from "../../api";
import useSound from "use-sound";
import styles from './Board.module.scss';
import { Cell } from "./Cell";

// sound fx
import moveSound from '../../assets/sounds/move.mp3';
import captureSound from '../../assets/sounds/capture.mp3';

// prop types for our component!
export interface BoardProps { 
    board: Board;
    displayFEN?: boolean;
}

const fileLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rankLabels = ['1', '2', '3', '4', '5', '6', '7', '8'];

/*
 * The chess board. Has no control over the game itself, just current board state.
 */
// FC stands for Functional Component. This function returns a Functional Components with the props of BoardProps
export const BoardComponent: React.FC<BoardProps> = ({ board, displayFEN }) => {    
    const [ currentBoard, setCurrentBoard ] = useState<Board>(board);
    const [ activeCell, setActiveCell ] = useState<Coordinate>();
    const [ colorTurn, setColorTurn ] = useState<PieceColor>('white');
    const [ possibleMoves, setPossibleMoves ] = useState<Coordinate[]>([]);
    const [ playerView, setPlayerView ] = useState<PieceColor>('white');
    const fenString = useMemo<FEN>(() => convertBoardToFEN(currentBoard), [ currentBoard ]);

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

    return <><div className={styles.board}>
   
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

                    const fileHint = absoluteRowIndex === 7 ? fileLabels[relativeColIndex] : '';
                    const rankHint = absoluteColIndex === 0 ? rankLabels[relativeRowIndex] : '';

                    return <Cell
                        isBackgroundBlack={(relativeRowIndex + relativeColIndex) % 2 === 0}
                        moveHint={moveHint}
                        isHighlighted={isHighlighted}
                        fileHint={fileHint}
                        rankHint={rankHint}
                        key={`${relativeRowIndex} ${relativeColIndex}`}
                        piece={piece} 
                        onClick={() => onClickCell([ relativeRowIndex, relativeColIndex ])}
                    />;
                })}
            </div>
        })}
    </div>
    {displayFEN && <h2 className={styles.fen}>{fenString}</h2>}
    </>;
}