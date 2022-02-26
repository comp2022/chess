import React from "react";
import { Piece } from "../../api";
import styles from './Board.module.scss';
import { chesspieces } from "../../assets/chesspieces";
const classNames = require('classnames'); // https://github.com/JedWatson/classnames

export interface CellProps {
    isBackgroundBlack: boolean;
    moveHint: boolean;
    piece: Piece | null;
    onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ isBackgroundBlack, piece, onClick, moveHint }) => {
    let cn = classNames(
        [ styles.cell ], 
        { [ styles.cellOdd ]: isBackgroundBlack }, // determines shade of cell
    );

    let pieceImg;
    if (piece) {
        const index = (piece.color === 'white') ? 0 : 1;
        pieceImg = chesspieces[piece.type][index];
    }
    
    return (
        <div className={cn} onClick={() => onClick()}>
        { piece && <img 
            src={ pieceImg } 
            alt={ piece.type }
            
            className={styles.img} 
            draggable={false}
        />}

        {/* hint circle */}
        { moveHint && <div className={styles.moveHint} />}
        </div>
    )
        
   
}