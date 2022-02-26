import React from "react";
import { Piece } from "../../api";
import styles from './Board.module.scss';
import { chesspieces } from "../../assets/chesspieces";
const classNames = require('classnames'); // https://github.com/JedWatson/classnames

export interface CellProps {
    isBackgroundBlack: boolean;
    moveHint: boolean;
    isHighlighted: boolean;
    piece: Piece | null;
    onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ isBackgroundBlack, piece, onClick, moveHint, isHighlighted }) => {
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
        {/* highlighted, goes under the piece image */}
        { isHighlighted && <div className={styles.highlighted} />}

        {/* piece image */}
        { piece && <img 
            src={ pieceImg } 
            alt={ piece.type }
            
            className={styles.img} 
            draggable={false}
        />}

        {/* hint circle, goes over the piece image */}
        { moveHint && <div className={styles.moveHint} />}
        </div>
    )
        
   
}